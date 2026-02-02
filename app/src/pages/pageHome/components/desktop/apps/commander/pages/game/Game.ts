import { Arena, type ArenaType } from "./Arena";
import { GameEngine } from "./core/GameEngine";
import { UtilsCanvas } from "./core/UtilsCanvas";
import { UtilsTouch } from "./core/UtilsTouch";
import { Player } from "./Player";

type GameProps = {
	board: HTMLDivElement;
	playersNames: string[];
	arenaType: ArenaType;
	onGameOver: () => void;
};

export class Game {
	private board: HTMLDivElement;

	private grid!: { x1: number; y1: number; x2: number; y2: number };
	private arenaType: ArenaType;
	private onGameOver: () => void;

	private arena: Arena;
	private players: Player[] = [];
	private timeLeft: number;
	private winnerIndex: number;

	private adapter: number[][] = [];

	private gameEngine: GameEngine;

	constructor({ board, playersNames, arenaType, onGameOver }: GameProps) {
		this.board = board;
		this.arenaType = arenaType;
		this.onGameOver = onGameOver;

		this.arena = new Arena(this.arenaType);
		this.timeLeft = 2.5 * 60;

		this.winnerIndex = -1;

		this.gameEngine = new GameEngine({
			div: this.board,
			onStart: ({ ctx, timeDif }) => {
				this.initTouches();
				this.initGrid();
				this.initPlayers(playersNames);
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
		if (this.winnerIndex !== -1) {
			return;
		}

		this.updateTimeLeft(timeDif);
		this.updatePlayers(timeDif);
		this.updateGameOver(timeDif);
	}

	private draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.drawReset(ctx);
		this.drawArena(ctx);
		this.drawTimeLeft(ctx);
		this.drawPlayersDetails(ctx);
		this.drawPlayersAssets(ctx);
		this.drawGameOver(ctx);

		//log
		this.drawGrid(ctx);

		ctx.restore();
	}

	private initTouches() {
		UtilsTouch.listenToTouches({
			div: this.board,
			onTouchEnd: (_e, _sx, _sy, x, y, _time) => {
				console.log(x, y);
			},
		});
	}

	private initGrid() {
		this.grid = { x1: 125, y1: 170, x2: 430, y2: 585 };
	}

	private initPlayers(playersNames: string[]) {
		this.players = [];

		playersNames.forEach((playerName) => {
			this.players.push(new Player(playerName));
		});
	}

	private initAdapter() {
		this.adapter = [];

		for (let y = 0; y < 20; y++) {
			this.adapter[y] = [];

			for (let x = 0; x < 20; x++) {
				this.adapter[y][x] = 0;
			}
		}

		// const gh = (this.grid.y2 - this.grid.y1) / this.adapter[0].length;
		// const gw = (this.grid.x2 - this.grid.x1) / this.adapter.length;

		// //add buildings
		// for (let i = 0; i < this.players.length; i++) {
		// 	for (let j = 0; j < this.players[i].getProductionBuildings().length; j++) {

		// 			const castleX = Math.floor((this.players[i].getProductionBuildings()[j].getX() - this.grid.x1) / gw);
		// 			const castleY = Math.floor((this.players[i].getProductionBuildings()[j].getY() - this.grid.y1) / gh);
		// 			const castleType = this.players[i].getProductionBuildings()[this.players[i].getType()];

		// 			this.adapter[castleY][castleX] = castleType;
		// 	}
		// }

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

	private updateTimeLeft(timeDif: number) {
		this.timeLeft = Math.max(0, this.timeLeft - timeDif / 1000);
	}

	private updatePlayers(timeDif: number) {
		this.players.forEach((player) => {
			player.update(timeDif);
		});
	}

	private updateGameOver(_timeDif: number) {
		const playersStillAlive: number[] = [];

		this.players.forEach((player, index) => {
			if (player.isAlive()) {
				playersStillAlive.push(index);
			}
		});

		if (playersStillAlive.length === 1) {
			this.winnerIndex = playersStillAlive[0];

			this.onGameOver?.();
		}
	}

	private drawReset(ctx: CanvasRenderingContext2D) {
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
		const layoutWidth = this.board.parentElement?.offsetWidth || 0;

		ctx.save();

		ctx.fillStyle = "#00000088";
		ctx.beginPath();
		UtilsCanvas.rectRound(ctx, 380, 140, 80, 40, 5);
		ctx.fill();

		ctx.restore();

		ctx.save();

		ctx.font = "oswald 12px";
		ctx.fillStyle = "#ffffff";
		ctx.shadowColor = "#000000";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";

		const minutes = Math.floor(this.timeLeft / 60);
		const seconds = Math.floor(this.timeLeft % 60);

		ctx.fillText(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`, layoutWidth - 20, 20);

		ctx.fillStyle = "#ffff66";
		ctx.fillText("Time:", layoutWidth - 80, 20);

		ctx.restore();
	}

	private drawGameOver(ctx: CanvasRenderingContext2D) {
		if (this.winnerIndex !== -1) {
			ctx.save();

			ctx.font = "oswald 16px";
			ctx.fillStyle = "#ffffff";
			ctx.shadowColor = "#000000";
			ctx.shadowOffsetX = 3;
			ctx.shadowOffsetY = 3;
			ctx.shadowBlur = 3;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			ctx.fillText("Game Over", 270, 250);
			ctx.fillText(`${this.players[this.winnerIndex].getPlayerName()} Wins !`, 270, 280);

			ctx.restore();
		}
	}

	private drawPlayersDetails(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.font = "oswald 10px";
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";

		ctx.fillStyle = "#ffff66";
		ctx.strokeStyle = "#ffff66";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(20, 20 + 2);
		ctx.lineTo(300, 20 + 2);
		ctx.stroke();
		ctx.fillText("Players", 20, 20);
		ctx.fillText("Gold", 100, 20);
		ctx.fillText("Iron", 130, 20);
		ctx.fillText("Oil", 160, 20);
		ctx.fillText("Buildings", 200, 20);
		ctx.fillText("Units", 250, 20);

		ctx.fillStyle = "#ffffff";

		this.players.forEach((player, index) => {
			ctx.fillText(player.getPlayerName(), 20, 40 + 20 * index);
			ctx.fillText(`${player.getGold()}`, 100, 40 + 20 * index);
			ctx.fillText(`${player.getIron()}`, 130, 40 + 20 * index);
			ctx.fillText(`${player.getOil()}`, 160, 40 + 20 * index);
			ctx.fillText(`${player.getResourceBuildings().length + player.getProductionBuildings().length}`, 200, 40 + 20 * index);
			ctx.fillText(`${player.getUnits().length}`, 250, 40 + 20 * index);
		});

		ctx.restore();
	}

	private drawPlayersAssets(ctx: CanvasRenderingContext2D) {
		//clip grid area
		ctx.save();

		ctx.beginPath();
		ctx.rect(this.grid.x1, this.grid.y1, this.grid.x2 - this.grid.x1, this.grid.y2 - this.grid.y1);
		ctx.clip();

		//draw buildings
		this.players.forEach((player) => {
			player.draw(ctx);
		});

		ctx.restore();
	}
}
