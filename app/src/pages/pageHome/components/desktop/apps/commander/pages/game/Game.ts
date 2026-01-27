import { Arena, type ArenaType as IArenaType } from "./Arena";
import { GameEngine } from "./core/GameEngine";
import { UtilsCanvas } from "./core/UtilsCanvas";
import { UtilsMath } from "./core/UtilsMath";
import { UtilsPath } from "./core/UtilsPath";
import { UtilsTouch } from "./core/UtilsTouch";
import { type PlayerType as IPlayerType, Player } from "./Player";

type GameProps = {
	board: HTMLDivElement;
	goodPlayerName: string;
	badPlayerName: string;
	arenaType: IArenaType;
	onGameOver: () => void;
};

export class Game {
	private grid!: { x1: number; y1: number; x2: number; y2: number };

	private board: HTMLDivElement;
	private goodPlayerName: string;
	private badPlayerName: string;
	private arenaType: IArenaType;
	private onGameOver: () => void;

	private arena: Arena;
	private players: Player[] = [];
	private timeLeft: number;
	private winner: number;

	private adapter: number[][] = [];

	private gameEngine: GameEngine;

	constructor({ board, goodPlayerName, badPlayerName, arenaType, onGameOver }: GameProps) {
		this.board = board;
		this.goodPlayerName = goodPlayerName;
		this.badPlayerName = badPlayerName;
		this.arenaType = arenaType;
		this.onGameOver = onGameOver;

		this.arena = new Arena(this.arenaType);
		this.timeLeft = 2.5 * 60;

		this.winner = -1;

		this.gameEngine = new GameEngine({
			div: this.board,
			onStart: ({ ctx, timeDif }) => {
				this.initTouches();
				this.initGrid();
				this.initPlayers();
				this.initAdapter();

				this.update(timeDif);
				this.draw(ctx);
			},
			onUpdate: ({ ctx, timeDif }) => {
				this.update(timeDif);
				this.draw(ctx);
			},
		});
	}

	public start() {
		this.gameEngine.start();
	}

	public stop() {
		this.gameEngine.stop();
	}

	private update(timeDif: number) {
		//if gameOver then do not update anything
		if (this.winner !== -1) {
			return;
		}

		this.updatePlayerBadAi(timeDif);
		this.updateTimeLeft(timeDif);
		this.updatePlayers(timeDif);
		this.updateUnitsMove(timeDif);
		this.updateAttacks(timeDif);
		this.updateGameOver(timeDif);
	}

	private draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.drawInit(ctx);
		this.drawArena(ctx);
		this.drawTimeLeft(ctx);
		this.drawPlayersNames(ctx);
		this.drawPlayers(ctx);
		this.drawGameOver(ctx);

		//log
		this.drawGrid(ctx);

		ctx.restore();
	}

	private initTouches() {
		UtilsTouch.listenToTouches({
			div: this.board,
			onTouchEnd: (_e, _sx, _sy, x, y, _time) => {
				//up
				if (this.isXYInsideGrid(x, y) === false) {
					this.selectStack(x, y);
				} else if (this.isXYInsideSafeArea(x, y) === true) {
					this.putSelectedStackOnGrid(x, y);
				}
			},
		});
	}

	private initGrid() {
		this.grid = { x1: 125, y1: 170, x2: 430, y2: 585 };
	}

	private initPlayers() {
		this.players = [];
		this.players.push(
			new Player(this.goodPlayerName, "good", [
				"tank",
				"knight",
				"paladin",
				"goblin",
				"wolf",
				"golem",
				"orc",
				"sorcerer",
				"ninja",
				"snake",
				"giant",
				"musketeer",
				"hogRider",
				"amazon",
				"tankLight",
			]),
		);
		this.players.push(
			new Player(this.badPlayerName, "bad", [
				"tank",
				"knight",
				"paladin",
				"goblin",
				"wolf",
				"golem",
				"orc",
				"sorcerer",
				"ninja",
				"snake",
				"musketeer",
				"hogRider",
				"amazon",
				"tankLight",
			]),
		);
	}

	private initAdapter() {
		this.adapter = [];

		for (let y = 0; y < 20; y++) {
			this.adapter[y] = [];

			for (let x = 0; x < 20; x++) {
				this.adapter[y][x] = 0;
			}
		}

		const gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
		const gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

		//add castles
		const castlesType: { [K in IPlayerType]: number } = {
			good: 1,
			bad: 2,
		};

		for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.players[i].getCastles().length; j++) {
				if (this.players[i].getCastles()[j].getLife() > 0) {
					const castleX = Math.floor((this.players[i].getCastles()[j].getX() - this.grid.x1) / gw);
					const castleY = Math.floor((this.players[i].getCastles()[j].getY() - this.grid.y1) / gh);
					const castleType = castlesType[this.players[i].getType()];

					this.adapter[castleY][castleX] = castleType;
				}
			}
		}

		//add obstacles
		for (let i = 0; i < this.adapter[9].length; i++) {
			for (let j = 0; j < 2; j++) {
				this.adapter[9 + j][i] = 3;
			}
		}

		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 1; j++) {
				this.adapter[9 + i][4 + j] = 0;
				this.adapter[9 + i][15 + j] = 0;
			}
		}

		// log
		// const x = 19;
		// const y = 19;
		// const castle = UtilsPath.findClosestXYOfValue(x, y, 2, this.adapter);
		// const path = UtilsPath.findPath(x, y, castle.x, castle.y, this.adapter);

		// for (let i = 0; i < path.length; i++) {
		// 	this.adapter[path[i].y][path[i].x] = 4;
		// }
	}

	private isXYInsideGrid(x: number, y: number) {
		return x >= this.grid.x1 && y >= this.grid.y1 && x <= this.grid.x2 && y <= this.grid.y2;
	}

	private selectStack(x: number, y: number) {
		let isStackSelected = false;

		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].getType() === "good") {
				this.players[i].setStackSelected(-1);

				for (let j = 1; j < this.players[i].getStacks().length; j++) {
					if (this.players[i].getStacks()[j] === null) {
						continue;
					}

					const isStackPressed = this.players[i].getStacks()[j]?.isXYInsideUnit(x, y);

					if (isStackPressed === true) {
						isStackSelected = true;

						this.players[i].setStackSelected(j);
						this.players[i].getStacks()[j]?.setScale(this.players[i].getStacks()[j]?.getScale() || 0, Player.STACK_SCALE_SELECTED, 300);
					} else {
						this.players[i].getStacks()[j]?.setScale(this.players[i].getStacks()[j]?.getScale() || 0, Player.STACK_SCALE_UNSELECTED, 300);
					}
				}
			}
		}

		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].getType() === "bad") {
				for (let j = 0; j < this.players[i].getCastles().length; j++) {
					if (isStackSelected === true) {
						this.players[i].getCastles()[j].setWeaponRangeOpacity(this.players[i].getCastles()[j].getWeaponRangeOpacity(), 1, 300);
					} else {
						this.players[i].getCastles()[j].setWeaponRangeOpacity(this.players[i].getCastles()[j].getWeaponRangeOpacity(), 0, 300);
					}
				}
			}
		}
	}

	private putSelectedStackOnGrid(x: number, y: number) {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].getType() === "good") {
				this.players[i].putSelectedStackOnGrid(x, y);
			}
		}
	}

	private isXYInsideSafeArea(x: number, y: number) {
		let isSafe = true;

		a: for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.players[i].getCastles().length; j++) {
				if (
					this.players[i].getType() === "bad" &&
					this.players[i].getCastles()[j].isXYInsideWeaponRange(x, y) === true &&
					this.players[i].getCastles()[j].getLife() > 0
				) {
					isSafe = false;
					break a;
				}
			}
		}

		return isSafe;
	}

	private updateTimeLeft(timeDif: number) {
		this.timeLeft = Math.max(0, this.timeLeft - timeDif / 1000);
	}

	private updatePlayers(timeDif: number) {
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].update(timeDif);
		}
	}

	private updateUnitsMove(timeDif: number) {
		const castlesToAttack: { [K in IPlayerType]: number } = {
			good: 2,
			bad: 1,
		};

		const gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
		const gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

		for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.players[i].getUnits().length; j++) {
				if (this.players[i].getUnits()[j].getIsAttacking() === false) {
					const m = timeDif / this.players[i].getUnits()[j].getMoveSpeed();

					// let oldX = this.players[i].getUnits()[j].getX();
					const oldY = this.players[i].getUnits()[j].getY();

					let x = Math.round((this.players[i].getUnits()[j].getX() - this.grid.x1) / gw);
					let y = Math.round((this.players[i].getUnits()[j].getY() - this.grid.y1) / gh);

					const castleToAttack = castlesToAttack[this.players[i].getType()];
					const castle = UtilsPath.findClosestXYOfValue(x, y, castleToAttack, this.adapter);
					const path = UtilsPath.findPath(x, y, castle.x, castle.y, this.adapter);

					x = (path[2]?.x || path[1].x) * gw + this.grid.x1;
					y = (path[2]?.y || path[1].x) * gh + this.grid.y1;

					this.players[i].getUnits()[j].setX(this.players[i].getUnits()[j].getX() + (x - this.players[i].getUnits()[j].getX()) * m);
					this.players[i].getUnits()[j].setY(this.players[i].getUnits()[j].getY() + (y - this.players[i].getUnits()[j].getY()) * m);

					if (oldY >= this.players[i].getUnits()[j].getY()) {
						this.players[i].getUnits()[j].setDirection("up");
					} else {
						this.players[i].getUnits()[j].setDirection("down");
					}
				}

				if (this.players[i].getUnits()[j].getDirection() === "up") {
					if (this.players[i].getUnits()[j].getIsAttacking() === false && this.players[i].getUnits()[j].getState() !== "walkUp") {
						this.players[i].getUnits()[j].setState("walkUp");
					}

					if (this.players[i].getUnits()[j].getIsAttacking() === true && this.players[i].getUnits()[j].getState() !== "attackUp") {
						this.players[i].getUnits()[j].setState("attackUp");
					}
				} else {
					if (this.players[i].getUnits()[j].getIsAttacking() === false && this.players[i].getUnits()[j].getState() !== "walkDown") {
						this.players[i].getUnits()[j].setState("walkDown");
					}

					if (this.players[i].getUnits()[j].getIsAttacking() === true && this.players[i].getUnits()[j].getState() !== "attackDown") {
						this.players[i].getUnits()[j].setState("attackDown");
					}
				}
			}
		}
	}

	private updateAttacks(timeDif: number) {
		//update attacks
		for (let a = 0; a < this.players.length; a++) {
			for (let b = 0; b < this.players.length; b++) {
				if (this.players[a].getType() === this.players[b].getType()) {
					continue;
				}

				const playerAUnitsAndCastles = [...this.players[a].getUnits(), ...this.players[a].getCastles()];
				const playerBUnitsAndCastles = [...this.players[b].getUnits(), ...this.players[b].getCastles()];

				for (let i = 0; i < playerAUnitsAndCastles.length; i++) {
					for (let j = 0; j < playerBUnitsAndCastles.length; j++) {
						if (
							playerAUnitsAndCastles[i].getLife() > 0 &&
							playerAUnitsAndCastles[i].isXYInsideWeaponRange(playerBUnitsAndCastles[j].getX(), playerBUnitsAndCastles[j].getY()) === true
						) {
							playerAUnitsAndCastles[i].startAttacking(playerBUnitsAndCastles[j].getX(), playerBUnitsAndCastles[j].getY());

							const weaponSpeed = timeDif / playerAUnitsAndCastles[i].getWeaponSpeed();
							const weaponDamage = weaponSpeed * playerAUnitsAndCastles[i].getWeaponDamage();

							playerBUnitsAndCastles[j].setLife(Math.max(playerBUnitsAndCastles[j].getLife() - weaponDamage, 0));

							break;
						}
					}
				}
			}
		}

		//remove dead units and castles from players
		for (let i = 0; i < this.players.length; i++) {
			//dead units
			for (let j = 0; j < this.players[i].getUnits().length; j++) {
				if (this.players[i].getUnits()[j].getLife() === 0) {
					for (let a = 0; a < this.players.length; a++) {
						for (let b = 0; b < this.players[a].getUnits().length; b++) {
							if (this.players[a].getUnits()[b].isXYInsideWeaponRange(this.players[i].getUnits()[j].getX(), this.players[i].getUnits()[j].getY()) === true) {
								this.players[a].getUnits()[b].stopAttacking();
							}
						}

						for (let b = 0; b < this.players[a].getCastles().length; b++) {
							if (this.players[a].getCastles()[b].isXYInsideWeaponRange(this.players[i].getUnits()[j].getX(), this.players[i].getUnits()[j].getY()) === true) {
								this.players[a].getCastles()[b].stopAttacking();
							}
						}
					}

					this.players[i].getUnits()[j].stopAttacking();
					this.players[i].getUnits().splice(j, 1);
				}
			}

			//dead castles
			for (let j = 0; j < this.players[i].getCastles().length; j++) {
				if (this.players[i].getCastles()[j].getLife() === 0) {
					for (let a = 0; a < this.players.length; a++) {
						for (let b = 0; b < this.players[a].getUnits().length; b++) {
							if (
								this.players[a].getUnits()[b].isXYInsideWeaponRange(this.players[i].getCastles()[j].getX(), this.players[i].getCastles()[j].getY()) === true
							) {
								this.players[a].getUnits()[b].stopAttacking();
							}
						}
					}

					this.players[i].getCastles()[j].stopAttacking();
					this.players[i].getCastles()[j].setType("castleRuin");

					this.initAdapter();
				}
			}
		}
	}

	private updateGameOver(_timeDif: number) {
		//get winner
		const playersStillAlive = [];

		for (let i = 0; i < this.players.length; i++) {
			let isAllCastlesRuined = true;

			for (let j = 0; j < this.players[i].getCastles().length; j++) {
				if (this.players[i].getCastles()[j].getLife() > 0) {
					isAllCastlesRuined = false;
					break;
				}
			}

			if (isAllCastlesRuined === false) {
				playersStillAlive.push(i);
			}
		}

		if (playersStillAlive.length === 1) {
			this.winner = playersStillAlive[0];

			this.onGameOver?.();
		}
	}

	private updatePlayerBadAi(_timeDif: number) {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].getType() === "bad") {
				if (this.players[i].getStackSelected() === -1) {
					const j = UtilsMath.getRandomNumber(1, this.players[i].getStacks().length - 1);

					if (this.players[i].getStacks()[j] != null) {
						this.players[i].setStackSelected(j);
						this.players[i].getStacks()[j]?.setScale(this.players[i].getStacks()[j]?.getScale() || 0, Player.STACK_SCALE_SELECTED, 300);
					}
				} else {
					const x = UtilsMath.getRandomNumber(this.grid.x1, this.grid.x2);
					const y = UtilsMath.getRandomNumber(this.grid.y1, this.grid.y2 / 2.2);

					this.players[i].putSelectedStackOnGrid(x, y);
				}
			}
		}
	}

	private drawInit(ctx: CanvasRenderingContext2D) {
		const dpr = window.devicePixelRatio || 1;
		ctx.scale(dpr, dpr);

		ctx.clearRect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.scale(1, 1);
		ctx.translate(0.5, 0.5);

		ctx.beginPath();
		ctx.rect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.clip();
	}

	private drawArena(ctx: CanvasRenderingContext2D) {
		this.arena.drawImage(ctx);
	}

	private drawGrid(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
		const gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

		ctx.lineWidth = 1.0;

		for (let y = 0; y < this.adapter.length; y++) {
			for (let x = 0; x < this.adapter[y].length; x++) {
				ctx.beginPath();
				ctx.rect(this.grid.x1 + x * gw, this.grid.y1 + y * gh, gw, gh);

				switch (this.adapter[y][x]) {
					case 0: {
						ctx.strokeStyle = "#0000ff88";
						ctx.stroke();
						break;
					}

					case 1: {
						ctx.fillStyle = "#00ff0088";
						ctx.fill();
						break;
					}

					case 2: {
						ctx.fillStyle = "#ff000088";
						ctx.fill();
						break;
					}

					case 3: {
						ctx.fillStyle = "#0000ff88";
						ctx.fill();
						break;
					}

					case 4: {
						ctx.fillStyle = "#00ffff88";
						ctx.fill();
						break;
					}
				}
			}
		}

		ctx.restore();
	}

	private drawTimeLeft(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.fillStyle = "#00000088";
		ctx.beginPath();
		UtilsCanvas.rectRound(ctx, 380, 140, 80, 40, 5);
		ctx.fill();

		ctx.restore();

		ctx.save();

		ctx.font = "bold 12px Helvetica";
		ctx.fillStyle = "#ffffff";
		ctx.shadowColor = "#000000";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		const minutes = Math.floor(this.timeLeft / 60);
		const seconds = Math.floor(this.timeLeft % 60);

		ctx.fillText(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`, 420, 170);

		ctx.font = "bold 8px clashRoyaleFont";
		ctx.fillStyle = "#FFFDBC";
		ctx.fillText("Time Left:", 420, 155);

		ctx.restore();
	}

	private drawPlayersNames(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.font = "bold 10px Helvetica";
		ctx.fillStyle = "#ffffff";
		ctx.shadowColor = "#000000";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.textAlign = "center";

		for (let i = 0; i < this.players.length; i++) {
			switch (this.players[i].getType()) {
				case "bad":
					ctx.fillText(this.players[i].getPlayerName(), 420, 130);
					break;

				case "good":
					ctx.fillText(this.players[i].getPlayerName(), 420, 620);
					break;
			}
		}

		ctx.restore();
	}

	private drawPlayers(ctx: CanvasRenderingContext2D) {
		//draw elixir and stack
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].drawElixir(ctx);
			this.players[i].drawStack(ctx);
		}

		//clip grid area
		ctx.save();

		ctx.beginPath();
		ctx.rect(this.grid.x1, this.grid.y1, this.grid.x2 - this.grid.x1, this.grid.y2 - this.grid.y1);
		ctx.clip();

		//draw castles in higher zIndex
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].drawCastles(ctx);
		}

		//draw units in higher zIndex
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].drawUnits(ctx);
		}

		//draw attacks in higher zIndex
		for (let i = 0; i < this.players.length; i++) {
			this.players[i].drawAttacks(ctx);
		}

		ctx.restore();
	}

	private drawGameOver(ctx: CanvasRenderingContext2D) {
		if (this.winner !== -1) {
			ctx.save();

			ctx.font = "bold 16px clashRoyaleFont";
			ctx.fillStyle = "#ffffff";
			ctx.shadowColor = "#000000";
			ctx.shadowOffsetX = 3;
			ctx.shadowOffsetY = 3;
			ctx.shadowBlur = 3;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			ctx.fillText("Game Over", 270, 250);
			ctx.fillText(`${this.players[this.winner].getPlayerName()} Wins !`, 270, 280);

			ctx.restore();
		}
	}
}
