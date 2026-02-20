import { Arena, type ArenaType } from "./Arena";
import { ResourceBuilding } from "./buildings/ResourceBuilding";
import { University } from "./buildings/university/University";
import { Player } from "./player/Player";
import { GameEngine } from "./utils/GameEngine";
import { UtilsTouch } from "./utils/UtilsTouch";

type GameProps = {
	board: HTMLDivElement;
	playersNames: string[];
	arenaType: ArenaType;
	onGameOver: () => void;
};

type Map = "sea" | "land";

export class Game {
	private static readonly TIME_LEFT = 5 * 60;

	private board: HTMLDivElement;
	private arenaType: ArenaType;
	private onGameOver: () => void;

	private arena: Arena;
	private players: Player[] = [];
	private timeLeft: number;
	private winnerIndex: number;

	private static MAP_WIDTH = 50;
	private static MAP_HEIGHT = 25;

	private map: Map[][] = [];

	private gameEngine: GameEngine;

	constructor({ board, playersNames, arenaType, onGameOver }: GameProps) {
		this.board = board;
		this.arenaType = arenaType;
		this.onGameOver = onGameOver;

		this.arena = new Arena(this.arenaType);
		this.timeLeft = Game.TIME_LEFT;

		this.winnerIndex = -1;

		this.gameEngine = new GameEngine({
			div: board,
			width: 2000,
			height: 1000,
			onStart: ({ ctx, timeDif }) => {
				this.initTouches(board, ctx);
				this.initPlayers(playersNames);
				this.initMap();

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
		this.drawMap(ctx);
		this.drawTimeLeft(ctx);
		this.drawPlayersDetails(ctx);
		this.drawPlayersArmy(ctx);
		this.drawPlayersSelectedBuildingDetails(ctx);

		this.drawGameOver(ctx);

		ctx.restore();
	}

	private initTouches(div: HTMLDivElement, ctx: CanvasRenderingContext2D) {
		UtilsTouch.listenToTouches({
			div: div,
			onTouchMove: (_e, _sx, _sy, x, y, _time) => {
				const scaleX = this.getScaleX(ctx);
				const scaleY = this.getScaleY(ctx);

				const xx = x / scaleX;
				const yy = y / scaleY;

				this.players.forEach((player) => {
					player.getBuildings().forEach((building) => {
						if (building.position.isContains(xx, yy)) {
							building.state.isHovered = true;
						} else {
							building.state.isHovered = false;
						}
					});
				});
			},
			onTouchEnd: (_e, _sx, _sy, x, y, _time) => {
				const scaleX = this.getScaleX(ctx);
				const scaleY = this.getScaleY(ctx);

				const xx = x / scaleX;
				const yy = y / scaleY;

				this.players.forEach((player) => {
					player.getBuildings().forEach((building) => {
						if (building.position.isContains(xx, yy)) {
							building.state.isSelected = true;
						} else {
							building.state.isSelected = false;
						}
					});
				});
			},
		});
	}

	private initPlayers(playersNames: string[]) {
		this.players = [];

		playersNames.forEach((playerName) => {
			this.players.push(new Player(playerName));
		});
	}

	private initMap() {
		this.map = [];

		//create map
		for (let y = 0; y < Game.MAP_HEIGHT; y++) {
			this.map[y] = [];

			for (let x = 0; x < Game.MAP_WIDTH; x++) {
				this.map[y][x] = "land";
			}
		}

		//add sea
		// this.map[10][10] = "sea";

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
					case "land": {
						ctx.strokeStyle = "#00ff0033";
						ctx.stroke();
						break;
					}

					case "sea": {
						ctx.fillStyle = "#0000ff88";
						ctx.fill();
						break;
					}
				}
			}
		}

		ctx.restore();
	}

	private drawTimeLeft(ctx: CanvasRenderingContext2D) {
		const y = 20;

		ctx.save();

		ctx.font = "oswald 12px";
		ctx.shadowColor = "#000000";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";

		ctx.fillStyle = "#ffff66";
		ctx.fillText("Time:", 20, y);

		const minutes = Math.floor(this.timeLeft / 60);
		const seconds = Math.floor(this.timeLeft % 60);

		ctx.fillStyle = "#ffffff";
		ctx.fillText(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`, 80, y);

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
		const y = 60;

		ctx.save();

		ctx.font = "oswald 10px";
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";

		ctx.fillStyle = "#ffff66";
		ctx.strokeStyle = "#ffff66";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(20, y + 2);
		ctx.lineTo(350, y + 2);
		ctx.stroke();
		ctx.fillText("Players", 20, y);
		ctx.fillText("Gold", 100, y);
		ctx.fillText("Iron", 150, y);
		ctx.fillText("Oil", 200, y);
		ctx.fillText("Buildings", 250, y);
		ctx.fillText("Units", 300, y);

		ctx.fillStyle = "#ffffff";

		this.players.forEach((player, index) => {
			ctx.fillText(player.getPlayerName(), 20, y + 20 + 20 * index);
			ctx.fillText(`${player.getGold().toFixed(1)}`, 100, y + 20 + 20 * index);
			ctx.fillText(`${player.getIron().toFixed(1)}`, 150, y + 20 + 20 * index);
			ctx.fillText(`${player.getOil().toFixed(1)}`, 200, y + 20 + 20 * index);
			ctx.fillText(`${player.getBuildings().length}`, 250, y + 20 + 20 * index);
			ctx.fillText(`${player.getUnits().length}`, 300, y + 20 + 20 * index);
		});

		ctx.restore();
	}

	private getScaleX(ctx: CanvasRenderingContext2D): number {
		return ctx.canvas.width / Game.MAP_WIDTH;
	}

	private getScaleY(ctx: CanvasRenderingContext2D): number {
		return ctx.canvas.height / Game.MAP_HEIGHT;
	}

	private drawPlayersArmy(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const scaleX = this.getScaleX(ctx);
		const scaleY = this.getScaleY(ctx);
		ctx.scale(scaleX, scaleY);

		this.players.forEach((player) => {
			player.draw(ctx);
		});

		ctx.restore();
	}

	private drawPlayersSelectedBuildingDetails(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.players.forEach((player) => {
			player.getBuildings().forEach((building) => {
				if (building.state.isSelected) {
					const x = this.board.offsetWidth - 200 - 20 + this.board.scrollLeft;
					const y = 20;
					const w = 200;
					const h = 550;

					ctx.font = "oswald 12px";
					ctx.fillStyle = "#000000";
					ctx.strokeStyle = "#ffffff";
					ctx.beginPath();
					ctx.roundRect(x, y, w, h, [5, 5, 5, 5]);
					ctx.fill();
					ctx.stroke();
					ctx.closePath();
					ctx.drawImage(building.image, x + 130, y, 50, 50);

					ctx.fillStyle = "#ffff66";
					ctx.fillText(building.name, x + 10, y + 20);

					ctx.fillStyle = "#ffffff";

					if (building instanceof ResourceBuilding) {
						ctx.fillText(`Amount: ${building.amount.toFixed(1)}`, x + 10, y + 80);
					}

					if (building instanceof University) {
						ctx.fillText(`Gold Cost: ${building.costGold}`, x + 10, y + 60);
						ctx.fillText(`Iron Cost: ${building.costIron}`, x + 10, y + 80);
						ctx.fillText(`Oil Cost: ${building.costOil}`, x + 10, y + 100);

						building.researches.forEach((research, index) => {
							ctx.fillText(research.name, x + 10, y + 140 + 40 * index);
							ctx.drawImage(research.image, x + 130, y + 110 + 40 * index, 50, 50);
						});
					}
				}
			});
		});

		ctx.restore();
	}
}
