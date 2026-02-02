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

	private arenaType: ArenaType;
	private onGameOver: () => void;

	private arena: Arena;
	private players: Player[] = [];
	private timeLeft: number;
	private winnerIndex: number;

	private map: number[][] = [];

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
				this.initPlayers(playersNames);
				this.initMap(ctx);

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
		this.drawPlayersArmy(ctx);
		this.drawGameOver(ctx);

		//log
		this.drawMap(ctx);

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

	private initPlayers(playersNames: string[]) {
		this.players = [];

		playersNames.forEach((playerName) => {
			this.players.push(new Player(playerName));
		});
	}

	private initMap(ctx: CanvasRenderingContext2D) {
		this.map = [];

		//create map
		for (let y = 0; y < ctx.canvas.height / 20; y++) {
			this.map[y] = [];

			for (let x = 0; x < ctx.canvas.width / 20; x++) {
				this.map[y][x] = 0;
			}
		}

		//add terain
		for (let i = 0; i < this.map[9].length; i++) {
			for (let j = 0; j < 2; j++) {
				this.map[9 + j][i] = 3;
			}
		}

		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 1; j++) {
				this.map[9 + i][4 + j] = 0;
				this.map[9 + i][15 + j] = 0;
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

	private drawMap(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const suqareHeight = ctx.canvas.height / this.map.length;
		const squareWidth = ctx.canvas.width / this.map[0].length;

		ctx.lineWidth = 1.0;

		for (let y = 0; y < this.map.length; y++) {
			for (let x = 0; x < this.map[y].length; x++) {
				ctx.beginPath();
				ctx.rect(x * squareWidth, y * suqareHeight, squareWidth, suqareHeight);

				switch (this.map[y][x]) {
					case 0: {
						ctx.strokeStyle = "#0000ff33";
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
			ctx.fillText(`${player.getIron()}`, 230, 40 + 20 * index);
			ctx.fillText(`${player.getOil()}`, 360, 40 + 20 * index);
			ctx.fillText(`${player.getBuildings().length}`, 500, 40 + 20 * index);
			ctx.fillText(`${player.getUnits().length}`, 650, 40 + 20 * index);
		});

		ctx.restore();
	}

	private drawPlayersArmy(ctx: CanvasRenderingContext2D) {
		ctx.save();

		//draw buildings
		this.players.forEach((player) => {
			player.draw(ctx);
		});

		ctx.restore();
	}
}
