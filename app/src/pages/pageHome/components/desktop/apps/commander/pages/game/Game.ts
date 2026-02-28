import { Arena, type ArenaType } from "./Arena";
import { AirField } from "./buildings/airField/AirField";
import { Barracks } from "./buildings/barracks/Barracks";
import { CommandCenter } from "./buildings/commandCenter/CommandCenter";
import { Factory } from "./buildings/factory/Factory";
import { GoldMine } from "./buildings/goldMine/GoldMine";
import { IronMine } from "./buildings/ironMine/IronMine";
import { OilField } from "./buildings/oilField/OilField";
import { ProductionBuilding } from "./buildings/ProductionBuilding";
import { ResourceBuilding } from "./buildings/ResourceBuilding";
import { University } from "./buildings/university/University";
import { COLORS, GRID_SIZE, PLAYER_COLORS } from "./Constants";
import { Entity } from "./core/Entity";
import { Player } from "./player/Player";
import { Bomber } from "./units/Bomber";
import { Commando } from "./units/Commando";
import { Fighter } from "./units/Fighter";
import { HeavyTank } from "./units/HeavyTank";
import { Infantry } from "./units/Infantry";
import { Jeep } from "./units/Jeep";
import { LightTank } from "./units/LightTank";
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
	private hoveredBuildingItem: Entity | null = null;

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
				this.initTouches(board);
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
		this.drawGrid(ctx);
		this.drawTimeLeft(ctx);
		this.drawPlayersDetails(ctx);
		this.drawPlayersArmy(ctx);
		this.drawPlayersSelectedBuildingDetails(ctx);

		this.drawGameOver(ctx);

		ctx.restore();
	}

	private initTouches(div: HTMLDivElement) {
		UtilsTouch.listenToTouches({
			div: div,
			onTouchMove: (_e, _sx, _sy, x, y, _time) => {
				// check items on map
				this.players.forEach((player) => {
					player.getBuildings().forEach((building) => {
						if (building.isTouched(x, y)) {
							building.onTouchHoverStart();
						} else {
							building.onTouchHoverEnd();
						}

						if (building instanceof ProductionBuilding) {
							building.units.forEach((unit) => {
								if (unit.isTouched(x, y)) {
									unit.onTouchHoverStart();
								} else {
									unit.onTouchHoverEnd();
								}
							});
						}
					});
				});

				// check items on sidebar
				this.hoveredBuildingItem = null;
				this.players.forEach((player) => {
					player.getBuildings().forEach((building) => {
						if (building.getIsSelected() && building instanceof ProductionBuilding) {
							const boxX = this.board.offsetWidth - 200 - 20 + this.board.scrollLeft;
							const boxY = 20 + this.board.scrollTop;

							building.productionStore.forEach((unit, index) => {
								const itemX = boxX + 10;
								const itemY = boxY + 120 + 40 * index;
								const itemW = 180;
								const itemH = 40;

								if (x >= itemX && x <= itemX + itemW && y >= itemY && y <= itemY + itemH) {
									this.hoveredBuildingItem = unit;
								}
							});
						}
					});
				});
			},
			onTouchEnd: (_e, _sx, _sy, x, y, _time) => {
				// check items on map
				this.players.forEach((player) => {
					player.getBuildings().forEach((building) => {
						building.setIsSelected(false);

						if (building instanceof ProductionBuilding) {
							building.units.forEach((unit) => {
								unit.setIsSelected(false);
							});
						}
					});
				});

				this.players.forEach((player) => {
					player.getBuildings().forEach((building) => {
						if (building.isTouched(x, y)) {
							building.onTouchEnd();
						}

						if (building instanceof ProductionBuilding) {
							building.units.forEach((unit) => {
								if (unit.isTouched(x, y)) {
									unit.onTouchEnd();
								}
							});
						}
					});
				});

				// check items on sidebar
				this.players.forEach((player) => {
					player.getBuildings().forEach((building) => {
						if (building.getIsSelected() && building instanceof ProductionBuilding) {
							const boxX = this.board.offsetWidth - 200 - 20 + this.board.scrollLeft;
							const boxY = 20 + this.board.scrollTop;

							building.productionStore.forEach((unit, index) => {
								const itemX = boxX + 10;
								const itemY = boxY + 120 + 40 * index;
								const itemW = 180;
								const itemH = 40;

								if (x >= itemX && x <= itemX + itemW && y >= itemY && y <= itemY + itemH) {
									building.addUnitToProductionQueue(unit.clone({ x: building.position.x, y: building.position.y }));
								}
							});
						}
					});
				});
			},
		});
	}

	private initPlayers(playersNames: string[]) {
		this.players = [];

		playersNames.forEach((playerName, index) => {
			const color = PLAYER_COLORS[index % PLAYER_COLORS.length];
			this.players.push(new Player(playerName, color));
		});

		//temp
		const player0 = this.players[0];
		player0.addResourceBuilding(new GoldMine({ x: 10 * GRID_SIZE, y: 8 * GRID_SIZE }));
		player0.addResourceBuilding(new IronMine({ x: 11 * GRID_SIZE, y: 8 * GRID_SIZE }));
		player0.addResourceBuilding(new OilField({ x: 12 * GRID_SIZE, y: 8 * GRID_SIZE }));
		player0.addProductionBuilding(new CommandCenter({ x: 9 * GRID_SIZE, y: 9 * GRID_SIZE }));
		player0.addProductionBuilding(new University({ x: 10 * GRID_SIZE, y: 9 * GRID_SIZE }));
		player0.addProductionBuilding(new Barracks({ x: 7 * GRID_SIZE, y: 10 * GRID_SIZE }));
		player0.addProductionBuilding(new Factory({ x: 8 * GRID_SIZE, y: 10 * GRID_SIZE }));
		player0.addProductionBuilding(new AirField({ x: 9 * GRID_SIZE, y: 10 * GRID_SIZE }));

		player0.getProductionBuildings()[2].addUnit(new Infantry({ x: 5 * GRID_SIZE, y: 5 * GRID_SIZE }));
		player0.getProductionBuildings()[2].addUnit(new Infantry({ x: 6 * GRID_SIZE, y: 5 * GRID_SIZE }));
		player0.getProductionBuildings()[2].addUnit(new Commando({ x: 7 * GRID_SIZE, y: 5 * GRID_SIZE }));

		player0.getProductionBuildings()[3].addUnit(new Jeep({ x: 5 * GRID_SIZE, y: 6 * GRID_SIZE }));
		player0.getProductionBuildings()[3].addUnit(new LightTank({ x: 6 * GRID_SIZE, y: 6 * GRID_SIZE }));
		player0.getProductionBuildings()[3].addUnit(new HeavyTank({ x: 7 * GRID_SIZE, y: 6 * GRID_SIZE }));

		player0.getProductionBuildings()[4].addUnit(new Fighter({ x: 5 * GRID_SIZE, y: 7 * GRID_SIZE }));
		player0.getProductionBuildings()[4].addUnit(new Bomber({ x: 6 * GRID_SIZE, y: 7 * GRID_SIZE }));

		const player1 = this.players[1];
		player1.addResourceBuilding(new GoldMine({ x: 10 * GRID_SIZE, y: 20 * GRID_SIZE }));
		player1.addResourceBuilding(new IronMine({ x: 11 * GRID_SIZE, y: 20 * GRID_SIZE }));
		player1.addResourceBuilding(new OilField({ x: 12 * GRID_SIZE, y: 20 * GRID_SIZE }));
		player1.addProductionBuilding(new CommandCenter({ x: 9 * GRID_SIZE, y: 21 * GRID_SIZE }));
		player1.addProductionBuilding(new University({ x: 10 * GRID_SIZE, y: 21 * GRID_SIZE }));
		player1.addProductionBuilding(new Barracks({ x: 7 * GRID_SIZE, y: 22 * GRID_SIZE }));
		player1.addProductionBuilding(new Factory({ x: 8 * GRID_SIZE, y: 22 * GRID_SIZE }));
		player1.addProductionBuilding(new AirField({ x: 9 * GRID_SIZE, y: 22 * GRID_SIZE }));

		player1.getProductionBuildings()[2].addUnit(new Infantry({ x: 5 * GRID_SIZE, y: 18 * GRID_SIZE }));
		player1.getProductionBuildings()[2].addUnit(new Infantry({ x: 6 * GRID_SIZE, y: 18 * GRID_SIZE }));
		player1.getProductionBuildings()[2].addUnit(new Commando({ x: 7 * GRID_SIZE, y: 18 * GRID_SIZE }));

		player1.getProductionBuildings()[3].addUnit(new Jeep({ x: 5 * GRID_SIZE, y: 19 * GRID_SIZE }));
		player1.getProductionBuildings()[3].addUnit(new LightTank({ x: 6 * GRID_SIZE, y: 19 * GRID_SIZE }));
		player1.getProductionBuildings()[3].addUnit(new HeavyTank({ x: 7 * GRID_SIZE, y: 19 * GRID_SIZE }));

		player1.getProductionBuildings()[4].addUnit(new Fighter({ x: 5 * GRID_SIZE, y: 20 * GRID_SIZE }));
		player1.getProductionBuildings()[4].addUnit(new Bomber({ x: 6 * GRID_SIZE, y: 20 * GRID_SIZE }));
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

	private drawGrid(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.lineWidth = 1.0;

		for (let y = 0; y < this.map.length; y++) {
			for (let x = 0; x < this.map[y].length; x++) {
				ctx.beginPath();
				ctx.rect(x * GRID_SIZE, y * GRID_SIZE, GRID_SIZE, GRID_SIZE);

				switch (this.map[y][x]) {
					case "land": {
						ctx.strokeStyle = COLORS.LAND_STROKE;
						ctx.stroke();
						break;
					}

					case "sea": {
						ctx.fillStyle = COLORS.SEA_FILL;
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
		ctx.shadowColor = COLORS.BOX_BG;
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";

		ctx.fillStyle = COLORS.BOX_TITLE;
		ctx.fillText("Time:", 20, y);

		const minutes = Math.floor(this.timeLeft / 60);
		const seconds = Math.floor(this.timeLeft % 60);

		ctx.fillStyle = COLORS.BOX_TEXT;
		ctx.fillText(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`, 80, y);

		ctx.restore();
	}

	private drawGameOver(ctx: CanvasRenderingContext2D) {
		if (this.winnerIndex !== -1) {
			ctx.save();

			ctx.font = "oswald 16px";
			ctx.fillStyle = COLORS.BOX_TEXT;
			ctx.shadowColor = COLORS.BOX_BG;
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
		ctx.fillStyle = COLORS.BOX_TEXT;
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";

		ctx.fillStyle = COLORS.BOX_TITLE;
		ctx.strokeStyle = COLORS.BOX_TITLE;
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

		ctx.fillStyle = COLORS.BOX_TEXT;

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

	private drawPlayersArmy(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.players.forEach((player) => {
			player.draw(ctx);
		});

		ctx.restore();
	}

	private drawPlayersSelectedBuildingDetails(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.players.forEach((player) => {
			player.getBuildings().forEach((building) => {
				if (building.getIsSelected()) {
					const x = this.board.offsetWidth - 200 - 20 + this.board.scrollLeft;
					const y = 20 + this.board.scrollTop;
					const w = 200;
					const h = 560;

					// draw box
					ctx.font = "oswald 12px";
					ctx.fillStyle = COLORS.BOX_BG;
					ctx.strokeStyle = COLORS.BOX_TEXT;
					ctx.beginPath();
					ctx.roundRect(x, y, w, h, [5, 5, 5, 5]);
					ctx.fill();
					ctx.stroke();
					ctx.closePath();
					ctx.drawImage(building.image, x + 130, y, 50, 50);

					ctx.fillStyle = COLORS.BOX_TITLE;
					ctx.fillText(building.name, x + 10, y + 20);

					// draw line
					ctx.strokeStyle = COLORS.BOX_TITLE;
					ctx.beginPath();
					ctx.moveTo(x + 10, y + 120);
					ctx.lineTo(x + w - 10, y + 120);
					ctx.stroke();
					ctx.closePath();

					//draw items
					if (building instanceof ResourceBuilding) {
						ctx.fillStyle = COLORS.BOX_TEXT;
						ctx.fillText(`Amount: ${building.amount.toFixed(1)}`, x + 10, y + 60);
					}

					if (building instanceof CommandCenter) {
						ctx.fillStyle = COLORS.BOX_TEXT;

						building.buildings.forEach((building, index) => {
							ctx.fillText(building.name, x + 10, y + 140 + 40 * index);
							ctx.drawImage(building.image, x + 130, y + 120 + 40 * index, 50, 50);
						});
					}

					if (building instanceof University) {
						ctx.fillStyle = COLORS.BOX_TEXT;
						ctx.fillText(`Gold Cost: ${building.costGold}`, x + 10, y + 60);
						ctx.fillText(`Iron Cost: ${building.costIron}`, x + 10, y + 80);
						ctx.fillText(`Oil Cost: ${building.costOil}`, x + 10, y + 100);

						building.researches.forEach((research, index) => {
							ctx.fillText(research.name, x + 10, y + 140 + 40 * index);
							ctx.drawImage(research.image, x + 130, y + 120 + 40 * index, 50, 50);
						});
					}

					if (building instanceof ProductionBuilding) {
						ctx.fillStyle = COLORS.BOX_TEXT;
						ctx.fillText(`Gold Cost: ${building.costGold}`, x + 10, y + 60);
						ctx.fillText(`Iron Cost: ${building.costIron}`, x + 10, y + 80);
						ctx.fillText(`Oil Cost: ${building.costOil}`, x + 10, y + 100);

						building.productionStore.forEach((unit, index) => {
							const isHovered = this.hoveredBuildingItem === unit;

							if (isHovered) {
								ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
								ctx.fillRect(x + 10, y + 120 + 40 * index, 180, 40);
							}

							ctx.fillStyle = COLORS.BOX_TEXT;
							ctx.fillText(unit.name, x + 10, y + 140 + 40 * index);
							ctx.drawImage(unit.image, x + 130, y + 120 + 40 * index, 50, 50);
						});
					}
				}
			});
		});

		ctx.restore();
	}
}
