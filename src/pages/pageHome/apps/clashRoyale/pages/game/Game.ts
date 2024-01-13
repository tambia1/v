import { Arena, IType as IArenaType } from "./Arena";
import { Player, IType as IPlayerType } from "./Player";
import { UtilsCanvas } from "./UtilsCanvas";
import { UtilsMath } from "./UtilsMath";
import { UtilsPath } from "./UtilsPath";
import { UtilsTouch } from "./UtilsTouch";

type IGameProps = {
	board: HTMLElement;
	goodPlayerName: string;
	badPlayerName: string;
	arenaType: IArenaType;
	onGameOver: () => void;
};

export class Game {
	private canvas!: HTMLCanvasElement;
	private grid!: { x1: number; y1: number; x2: number; y2: number };

	private board: HTMLElement;
	private goodPlayerName: string;
	private badPlayerName: string;
	private arenaType: IArenaType;
	private onGameOver: () => void;

	private arena: Arena;
	private players: Player[] = [];
	private timeLeft: number;
	private winner: number;

	private adapter: number[][] = [];

	private requestAnimationFrameId: number = 0;

	private timeOld: number = 0;
	private timeNow: number = 0;
	private timeDif: number = 0;

	constructor({ board, goodPlayerName, badPlayerName, arenaType, onGameOver }: IGameProps) {
		this.board = board;
		this.goodPlayerName = goodPlayerName;
		this.badPlayerName = badPlayerName;
		this.arenaType = arenaType;
		this.onGameOver = onGameOver;

		this.arena = new Arena(this.arenaType);
		this.timeLeft = 2.5 * 60;

		this.winner = -1;

		this.init();
	}

	private init() {
		this.initCanvas();
		this.initTouches();
		this.initGrid();
		this.initPlayers();
		this.initAdapter();
	}

	private initCanvas() {
		this.canvas = document.createElement("canvas");
		this.board.appendChild(this.canvas);

		let dpr = window.devicePixelRatio || 1;

		this.canvas.width = this.board.offsetWidth * dpr;
		this.canvas.height = this.board.offsetHeight * dpr;
	}

	private initTouches() {
		UtilsTouch.listenToTouches({
			div: this.canvas,
			onTouchEnd: (_e, _x, _y, xx, yy, _time) => {
				//up
				if (this.isXYInsideGrid(xx, yy) == false) {
					this.selectStack(xx, yy);
				} else if (this.isXYInsideSafeArea(xx, yy) == true) {
					this.putSelectedStackOnGrid(xx, yy);
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
			new Player(this.goodPlayerName, "good", ["tank", "knight", "paladin", "goblin", "wolf", "golem", "orc", "sorcerer", "ninja", "snake", "giant", "musketeer", "hogRider", "amazon"])
		);
		this.players.push(new Player(this.badPlayerName, "bad", ["tank", "knight", "paladin", "goblin", "wolf", "golem", "orc", "sorcerer", "ninja", "snake", "musketeer", "hogRider", "amazon"]));
	}

	private initAdapter() {
		this.adapter = [];

		for (let y = 0; y < 20; y++) {
			this.adapter[y] = [];

			for (let x = 0; x < 20; x++) {
				this.adapter[y][x] = 0;
			}
		}

		let gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
		let gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

		//add castles
		let castlesType: { [K in IPlayerType]: number } = {
			good: 1,
			bad: 2,
		};

		for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.players[i].getCastles().length; j++) {
				if (this.players[i].getCastles()[j].getLife() > 0) {
					let castleX = Math.floor((this.players[i].getCastles()[j].getX() - this.grid.x1) / gw);
					let castleY = Math.floor((this.players[i].getCastles()[j].getY() - this.grid.y1) / gh);
					let castleType = castlesType[this.players[i].getType()];

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
			if (this.players[i].getType() == "good") {
				this.players[i].setStackSelected(-1);

				for (let j = 1; j < this.players[i].getStacks().length; j++) {
					if (this.players[i].getStacks()[j] == null) {
						continue;
					}

					let isStackPressed = this.players[i].getStacks()[j]?.isXYInsideUnit(x, y);

					if (isStackPressed == true) {
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
			if (this.players[i].getType() == "bad") {
				for (let j = 0; j < this.players[i].getCastles().length; j++) {
					if (isStackSelected == true) {
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
			if (this.players[i].getType() == "good") {
				this.players[i].putSelectedStackOnGrid(x, y);
			}
		}
	}

	private isXYInsideSafeArea(x: number, y: number) {
		let isSafe = true;

		a: for (let i = 0; i < this.players.length; i++) {
			b: for (let j = 0; j < this.players[i].getCastles().length; j++) {
				if (this.players[i].getType() == "bad" && this.players[i].getCastles()[j].isXYInsideWeaponRange(x, y) == true && this.players[i].getCastles()[j].getLife() > 0) {
					isSafe = false;
					break a;
				}
			}
		}

		return isSafe;
	}

	public start() {
		this.requestAnimationFrameId = window.requestAnimationFrame(this.start.bind(this));

		this.timeOld = this.timeOld || performance.now();
		this.timeNow = performance.now();
		this.timeDif = this.timeNow - this.timeOld;

		let fps = 60;

		if (this.timeDif < 1000 / fps) {
			return;
		}

		this.timeOld = this.timeNow;

		this.update(this.timeDif);
		this.draw();
	}

	public stop() {
		window.cancelAnimationFrame(this.requestAnimationFrameId);
		this.requestAnimationFrameId = 0;
	}

	private update(timeDif: number) {
		//if gameOver then do not update anything
		if (this.winner != -1) {
			return;
		}

		this.updatePlayerBadAi(timeDif);

		this.updateTimeLeft(timeDif);
		this.updatePlayers(timeDif);
		this.updateUnitsMove(timeDif);
		this.updateAttacks(timeDif);
		this.updateGameOver(timeDif);
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
		let castlesToAttack: { [K in IPlayerType]: number } = {
			good: 2,
			bad: 1,
		};

		let gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
		let gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

		for (let i = 0; i < this.players.length; i++) {
			for (let j = 0; j < this.players[i].getUnits().length; j++) {
				if (this.players[i].getUnits()[j].getIsAttacking() == false) {
					let m = timeDif / this.players[i].getUnits()[j].getMoveSpeed();

					// let oldX = this.players[i].getUnits()[j].getX();
					let oldY = this.players[i].getUnits()[j].getY();

					let x = Math.round((this.players[i].getUnits()[j].getX() - this.grid.x1) / gw);
					let y = Math.round((this.players[i].getUnits()[j].getY() - this.grid.y1) / gh);

					let castleToAttack = castlesToAttack[this.players[i].getType()];
					let castle = UtilsPath.findClosestXYOfValue(x, y, castleToAttack, this.adapter);
					let path = UtilsPath.findPath(x, y, castle.x, castle.y, this.adapter);

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

				if (this.players[i].getUnits()[j].getDirection() == "up") {
					if (this.players[i].getUnits()[j].getIsAttacking() == false && this.players[i].getUnits()[j].getState() != "walkUp") {
						this.players[i].getUnits()[j].setState("walkUp");
					}

					if (this.players[i].getUnits()[j].getIsAttacking() == true && this.players[i].getUnits()[j].getState() != "attackUp") {
						this.players[i].getUnits()[j].setState("attackUp");
					}
				} else {
					if (this.players[i].getUnits()[j].getIsAttacking() == false && this.players[i].getUnits()[j].getState() != "walkDown") {
						this.players[i].getUnits()[j].setState("walkDown");
					}

					if (this.players[i].getUnits()[j].getIsAttacking() == true && this.players[i].getUnits()[j].getState() != "attackDown") {
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
				if (this.players[a].getType() == this.players[b].getType()) {
					continue;
				}

				let playerAUnitsAndCastles = [...this.players[a].getUnits(), ...this.players[a].getCastles()];
				let playerBUnitsAndCastles = [...this.players[b].getUnits(), ...this.players[b].getCastles()];

				for (let i = 0; i < playerAUnitsAndCastles.length; i++) {
					for (let j = 0; j < playerBUnitsAndCastles.length; j++) {
						if (playerAUnitsAndCastles[i].getLife() > 0 && playerAUnitsAndCastles[i].isXYInsideWeaponRange(playerBUnitsAndCastles[j].getX(), playerBUnitsAndCastles[j].getY()) == true) {
							playerAUnitsAndCastles[i].startAttacking(playerBUnitsAndCastles[j].getX(), playerBUnitsAndCastles[j].getY());

							let weaponSpeed = timeDif / playerAUnitsAndCastles[i].getWeaponSpeed();
							let weaponDamage = weaponSpeed * playerAUnitsAndCastles[i].getWeaponDamage();

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
				if (this.players[i].getUnits()[j].getLife() == 0) {
					for (let a = 0; a < this.players.length; a++) {
						for (let b = 0; b < this.players[a].getUnits().length; b++) {
							if (this.players[a].getUnits()[b].isXYInsideWeaponRange(this.players[i].getUnits()[j].getX(), this.players[i].getUnits()[j].getY()) == true) {
								this.players[a].getUnits()[b].stopAttacking();
							}
						}

						for (let b = 0; b < this.players[a].getCastles().length; b++) {
							if (this.players[a].getCastles()[b].isXYInsideWeaponRange(this.players[i].getUnits()[j].getX(), this.players[i].getUnits()[j].getY()) == true) {
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
				if (this.players[i].getCastles()[j].getLife() == 0) {
					for (let a = 0; a < this.players.length; a++) {
						for (let b = 0; b < this.players[a].getUnits().length; b++) {
							if (this.players[a].getUnits()[b].isXYInsideWeaponRange(this.players[i].getCastles()[j].getX(), this.players[i].getCastles()[j].getY()) == true) {
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
		let playersStillAlive = [];

		for (let i = 0; i < this.players.length; i++) {
			let isAllCastlesRuined = true;

			for (let j = 0; j < this.players[i].getCastles().length; j++) {
				if (this.players[i].getCastles()[j].getLife() > 0) {
					isAllCastlesRuined = false;
					break;
				}
			}

			if (isAllCastlesRuined == false) {
				playersStillAlive.push(i);
			}
		}

		if (playersStillAlive.length == 1) {
			this.winner = playersStillAlive[0];

			this.onGameOver?.();
		}
	}

	private updatePlayerBadAi(_timeDif: number) {
		for (let i = 0; i < this.players.length; i++) {
			if (this.players[i].getType() == "bad") {
				if (this.players[i].getStackSelected() == -1) {
					let j = UtilsMath.getRandomNumber(1, this.players[i].getStacks().length - 1);

					if (this.players[i].getStacks()[j] != null) {
						this.players[i].setStackSelected(j);
						this.players[i].getStacks()[j]?.setScale(this.players[i].getStacks()[j]?.getScale() || 0, Player.STACK_SCALE_SELECTED, 300);
					}
				} else {
					let x = UtilsMath.getRandomNumber(this.grid.x1, this.grid.x2);
					let y = UtilsMath.getRandomNumber(this.grid.y1, this.grid.y2 / 2.2);

					this.players[i].putSelectedStackOnGrid(x, y);
				}
			}
		}
	}

	private draw() {
		let ctx = this.canvas.getContext("2d");

		if (ctx != null) {
			ctx.save();

			this.drawInit(ctx);
			this.drawArena(ctx);
			this.drawTimeLeft(ctx);
			this.drawPlayersNames(ctx);
			this.drawPlayers(ctx);
			this.drawGameOver(ctx);

			//log
			// this.drawGrid(ctx);

			ctx.restore();
		}
	}

	private drawInit(ctx: CanvasRenderingContext2D) {
		let dpr = window.devicePixelRatio || 1;
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

	public drawGrid(ctx: CanvasRenderingContext2D) {
		ctx.save();

		let gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
		let gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

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

		let minutes = Math.floor(this.timeLeft / 60);
		let seconds = Math.floor(this.timeLeft % 60);

		ctx.fillText(minutes + ":" + (seconds < 10 ? "0" : "") + seconds, 420, 170);

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
		if (this.winner != -1) {
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
			ctx.fillText(this.players[this.winner].getPlayerName() + " Wins !", 270, 280);

			ctx.restore();
		}
	}
}
