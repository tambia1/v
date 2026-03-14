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
import { Unit } from "./units/Unit";
import { GameEngine } from "./utils/GameEngine";
import { UtilsTouch } from "./utils/UtilsTouch";
import { Weapon } from "./weapons/Weapon";

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

	private static readonly MAP_WIDTH = 50;
	private static readonly MAP_HEIGHT = 25;

	private static readonly MENU_WIDTH = 180;
	private static readonly MENU_HEIGHT = 600;
	private static readonly MENU_MARGIN = 20;
	private static readonly MENU_PADDING = 10;
	private static readonly MENU_BUILDING_SIZE = 80;
	private static readonly MENU_TEXT_HEIGHT = 20;
	private static readonly MENU_ITEM_WIDTH = 40;
	private static readonly MENU_ITEM_HEIGHT = 40;
	private static readonly MENU_ITEM_COLUMNS = 3;

	private map: Map[][] = [];

	private gameEngine: GameEngine;

	private hoveredEntity: Entity | null = null;
	private selectedEntity: Entity | null = null;
	private hoveredGridX = -1;
	private hoveredGridY = -1;

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
		this.updateCombat(timeDif);
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
		this.drawSelectedEntityDetails(ctx);

		this.drawGameOver(ctx);

		ctx.restore();
	}

	private initTouches(div: HTMLDivElement) {
		UtilsTouch.listenToTouches({
			div: div,
			onTouchMove: (_e, _sx, _sy, x, y, _time) => {
				this.hoveredGridX = Math.floor(x / GRID_SIZE);
				this.hoveredGridY = Math.floor(y / GRID_SIZE);

				// check items on map
				this.players.forEach((player) => {
					player.getBuildings().forEach((building) => {
						if (building.isTouched(x, y)) {
							building.setIsHovered(true);
						} else {
							building.setIsHovered(false);
						}

						if (building instanceof ProductionBuilding) {
							building.products.forEach((product) => {
								if (product.isTouched(x, y)) {
									product.setIsHovered(true);
								} else {
									product.setIsHovered(false);
								}
							});
						}
					});
				});

				// check items on sidebar
				this.hoveredEntity = null;

				this.players.forEach((player) => {
					player.getBuildings().forEach((building) => {
						if (building.getIsSelected() && building instanceof ProductionBuilding) {
							const boxX = this.board.offsetWidth - Game.MENU_WIDTH - Game.MENU_MARGIN + this.board.scrollLeft;
							const boxY = Game.MENU_MARGIN + this.board.scrollTop;

							let xx = boxX + Game.MENU_PADDING;
							let yy = boxY + Game.MENU_TEXT_HEIGHT * 9;

							const ww = Game.MENU_ITEM_WIDTH;
							const hh = Game.MENU_ITEM_HEIGHT;

							let c = 0;

							building.productionStore.forEach((product) => {
								if (x >= xx && x <= xx + ww && y >= yy && y <= yy + hh) {
									this.hoveredEntity = product;
								}

								c = (c + 1) % Game.MENU_ITEM_COLUMNS;

								if (c === 0) {
									xx = boxX + Game.MENU_PADDING;
									yy += GRID_SIZE + Game.MENU_PADDING;
								} else {
									xx += GRID_SIZE + Game.MENU_PADDING * 2;
								}
							});
						}

						if (building instanceof ProductionBuilding) {
							building.products.forEach((product) => {
								if (product.getIsSelected() && product instanceof Unit) {
									const boxX = this.board.offsetWidth - Game.MENU_WIDTH - Game.MENU_MARGIN + this.board.scrollLeft;
									const boxY = Game.MENU_MARGIN + this.board.scrollTop;

									let xx = boxX + Game.MENU_PADDING;
									let yy = boxY + Game.MENU_TEXT_HEIGHT * 12;

									const ww = Game.MENU_ITEM_WIDTH;
									const hh = Game.MENU_ITEM_HEIGHT;

									let c = 0;

									product.getWeaponsSupported().forEach((weapon) => {
										if (x >= xx && x <= xx + ww && y >= yy && y <= yy + hh) {
											this.hoveredEntity = weapon;
										}

										c = (c + 1) % Game.MENU_ITEM_COLUMNS;

										if (c === 0) {
											xx = boxX + Game.MENU_PADDING;
											yy += GRID_SIZE + Game.MENU_PADDING;
										} else {
											xx += GRID_SIZE + Game.MENU_PADDING * 2;
										}
									});
								}
							});
						}
					});
				});
			},
			onTouchEnd: (_e, _sx, _sy, x, y, _time) => {
				this.hoveredGridX = -1;
				this.hoveredGridY = -1;

				// Check if click is inside the menu box
				const boxX = this.board.offsetWidth - Game.MENU_WIDTH - Game.MENU_MARGIN + this.board.scrollLeft;
				const boxY = Game.MENU_MARGIN + this.board.scrollTop;
				const boxW = Game.MENU_WIDTH;
				const boxH = Game.MENU_HEIGHT;
				const isClickInMenu = this.selectedEntity && x >= boxX && x <= boxX + boxW && y >= boxY && y <= boxY + boxH;

				if (isClickInMenu) {
					// Handle clicks on sidebar menu items only
					this.players.forEach((player) => {
						player.getBuildings().forEach((building) => {
							if (building.getIsSelected() && building instanceof ProductionBuilding) {
								let xx = boxX + Game.MENU_PADDING;
								let yy = boxY + Game.MENU_TEXT_HEIGHT * 9;

								const ww = Game.MENU_ITEM_WIDTH;
								const hh = Game.MENU_ITEM_HEIGHT;

								let c = 0;

								building.productionStore.forEach((product) => {
									if (x >= xx && x <= xx + ww && y >= yy && y <= yy + hh) {
										building.addEntityToProductionQueue(product.clone({ x: building.position.x, y: building.position.y }));
									}

									c = (c + 1) % Game.MENU_ITEM_COLUMNS;

									if (c === 0) {
										xx = boxX + Game.MENU_PADDING;
										yy += GRID_SIZE + Game.MENU_PADDING;
									} else {
										xx += GRID_SIZE + Game.MENU_PADDING * 2;
									}
								});
							}

							if (building instanceof ProductionBuilding) {
								building.products.forEach((product) => {
									if (product.getIsSelected() && product instanceof Unit) {
										let xx = boxX + Game.MENU_PADDING;
										let yy = boxY + Game.MENU_TEXT_HEIGHT * 12;

										const ww = Game.MENU_ITEM_WIDTH;
										const hh = Game.MENU_ITEM_HEIGHT;

										let c = 0;

										product.getWeaponsSupported().forEach((weapon) => {
											if (x >= xx && x <= xx + ww && y >= yy && y <= yy + hh) {
												product.addWeaponToProductionQueue(weapon);
											}

											c = (c + 1) % Game.MENU_ITEM_COLUMNS;

											if (c === 0) {
												xx = boxX + Game.MENU_PADDING;
												yy += GRID_SIZE + Game.MENU_PADDING;
											} else {
												xx += GRID_SIZE + Game.MENU_PADDING * 2;
											}
										});
									}
								});
							}
						});
					});
				} else {
					// Handle clicks on the map
					const previouslySelectedUnit = this.selectedEntity instanceof Unit ? this.selectedEntity : null;

					// Deselect all
					this.players.forEach((player) => {
						player.getBuildings().forEach((building) => {
							building.setIsSelected(false);
							this.selectedEntity = null;

							if (building instanceof ProductionBuilding) {
								building.products.forEach((product) => {
									product.setIsSelected(false);
								});
							}
						});
					});

					// Check if we clicked on any entity
					let clickedOnEntity = false;

					this.players.forEach((player) => {
						player.getBuildings().forEach((building) => {
							if (building.isTouched(x, y)) {
								building.setIsSelected(true);
								this.selectedEntity = building;
								clickedOnEntity = true;
							}

							if (building instanceof ProductionBuilding) {
								building.products.forEach((product) => {
									if (product.isTouched(x, y)) {
										product.setIsSelected(true);
										this.selectedEntity = product;
										clickedOnEntity = true;
									}
								});
							}
						});
					});

					// If a unit was selected and we clicked on an empty square, move the unit there
					if (previouslySelectedUnit && !clickedOnEntity) {
						const gridX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
						const gridY = Math.floor(y / GRID_SIZE) * GRID_SIZE;

						previouslySelectedUnit.move(gridX, gridY);
						previouslySelectedUnit.setIsSelected(true);

						this.selectedEntity = previouslySelectedUnit;
					}
				}
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
		const color0 = player0.getColor();
		player0.addResourceBuilding(new GoldMine({ x: 10 * GRID_SIZE, y: 8 * GRID_SIZE, color: color0 }));
		player0.addResourceBuilding(new IronMine({ x: 11 * GRID_SIZE, y: 8 * GRID_SIZE, color: color0 }));
		player0.addResourceBuilding(new OilField({ x: 12 * GRID_SIZE, y: 8 * GRID_SIZE, color: color0 }));
		player0.addProductionBuilding(new CommandCenter({ x: 9 * GRID_SIZE, y: 9 * GRID_SIZE, color: color0 }));
		player0.addProductionBuilding(new University({ x: 10 * GRID_SIZE, y: 9 * GRID_SIZE, color: color0 }));
		player0.addProductionBuilding(new Barracks({ x: 7 * GRID_SIZE, y: 10 * GRID_SIZE, color: color0 }));
		player0.addProductionBuilding(new Factory({ x: 8 * GRID_SIZE, y: 10 * GRID_SIZE, color: color0 }));
		player0.addProductionBuilding(new AirField({ x: 9 * GRID_SIZE, y: 10 * GRID_SIZE, color: color0 }));

		player0.getProductionBuildings()[2].addEntity(new Infantry({ x: 5 * GRID_SIZE, y: 5 * GRID_SIZE, color: color0 }));
		player0.getProductionBuildings()[2].addEntity(new Infantry({ x: 6 * GRID_SIZE, y: 5 * GRID_SIZE, color: color0 }));
		player0.getProductionBuildings()[2].addEntity(new Commando({ x: 7 * GRID_SIZE, y: 5 * GRID_SIZE, color: color0 }));

		player0.getProductionBuildings()[3].addEntity(new Jeep({ x: 5 * GRID_SIZE, y: 6 * GRID_SIZE, color: color0 }));
		player0.getProductionBuildings()[3].addEntity(new LightTank({ x: 6 * GRID_SIZE, y: 6 * GRID_SIZE, color: color0 }));
		player0.getProductionBuildings()[3].addEntity(new HeavyTank({ x: 7 * GRID_SIZE, y: 6 * GRID_SIZE, color: color0 }));

		player0.getProductionBuildings()[4].addEntity(new Fighter({ x: 5 * GRID_SIZE, y: 7 * GRID_SIZE, color: color0 }));
		player0.getProductionBuildings()[4].addEntity(new Bomber({ x: 6 * GRID_SIZE, y: 7 * GRID_SIZE, color: color0 }));

		const player1 = this.players[1];
		const color1 = player1.getColor();
		player1.addResourceBuilding(new GoldMine({ x: 0 * GRID_SIZE, y: 15 * GRID_SIZE, color: color1 }));
		player1.addResourceBuilding(new IronMine({ x: 1 * GRID_SIZE, y: 15 * GRID_SIZE, color: color1 }));
		player1.addResourceBuilding(new OilField({ x: 2 * GRID_SIZE, y: 15 * GRID_SIZE, color: color1 }));
		player1.addProductionBuilding(new CommandCenter({ x: 1 * GRID_SIZE, y: 16 * GRID_SIZE, color: color1 }));
		player1.addProductionBuilding(new University({ x: 2 * GRID_SIZE, y: 16 * GRID_SIZE, color: color1 }));
		player1.addProductionBuilding(new Barracks({ x: 1 * GRID_SIZE, y: 17 * GRID_SIZE, color: color1 }));
		player1.addProductionBuilding(new Factory({ x: 2 * GRID_SIZE, y: 17 * GRID_SIZE, color: color1 }));
		player1.addProductionBuilding(new AirField({ x: 3 * GRID_SIZE, y: 17 * GRID_SIZE, color: color1 }));

		player1.getProductionBuildings()[2].addEntity(new Infantry({ x: 2 * GRID_SIZE, y: 11 * GRID_SIZE, color: color1 }));
		player1.getProductionBuildings()[2].addEntity(new Infantry({ x: 3 * GRID_SIZE, y: 11 * GRID_SIZE, color: color1 }));
		player1.getProductionBuildings()[2].addEntity(new Commando({ x: 4 * GRID_SIZE, y: 11 * GRID_SIZE, color: color1 }));

		player1.getProductionBuildings()[3].addEntity(new Jeep({ x: 2 * GRID_SIZE, y: 12 * GRID_SIZE, color: color1 }));
		player1.getProductionBuildings()[3].addEntity(new LightTank({ x: 3 * GRID_SIZE, y: 12 * GRID_SIZE, color: color1 }));
		player1.getProductionBuildings()[3].addEntity(new HeavyTank({ x: 4 * GRID_SIZE, y: 12 * GRID_SIZE, color: color1 }));

		player1.getProductionBuildings()[4].addEntity(new Fighter({ x: 2 * GRID_SIZE, y: 13 * GRID_SIZE, color: color1 }));
		player1.getProductionBuildings()[4].addEntity(new Bomber({ x: 3 * GRID_SIZE, y: 13 * GRID_SIZE, color: color1 }));
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

	private updateCombat(timeDif: number) {
		for (let i = 0; i < this.players.length; i++) {
			for (let j = i + 1; j < this.players.length; j++) {
				const unitsA = this.players[i].getUnits().filter((u): u is Unit => u instanceof Unit);
				const unitsB = this.players[j].getUnits().filter((u): u is Unit => u instanceof Unit);

				for (const unitA of unitsA) {
					for (const unitB of unitsB) {
						// Check if units are on the same grid cell
						const gridAx = Math.floor(unitA.position.x / GRID_SIZE);
						const gridAy = Math.floor(unitA.position.y / GRID_SIZE);
						const gridBx = Math.floor(unitB.position.x / GRID_SIZE);
						const gridBy = Math.floor(unitB.position.y / GRID_SIZE);

						if (gridAx !== gridBx || gridAy !== gridBy) {
							continue;
						}

						// Unit A attacks Unit B
						for (const weapon of unitA.getWeaponsEquipped()) {
							if (weapon.canTarget(unitB.unitType)) {
								const damage = weapon.tryFire(timeDif);
								if (damage > 0) {
									unitB.currentLife -= damage;
								}
							}
						}

						// Unit B attacks Unit A
						for (const weapon of unitB.getWeaponsEquipped()) {
							if (weapon.canTarget(unitA.unitType)) {
								const damage = weapon.tryFire(timeDif);
								if (damage > 0) {
									unitA.currentLife -= damage;
								}
							}
						}
					}
				}
			}
		}

		// Remove dead units
		for (const player of this.players) {
			for (const building of player.getProductionBuildings()) {
				const deadUnits = building.products.filter((u) => u.currentLife <= 0);
				for (const dead of deadUnits) {
					if (dead === this.selectedEntity) {
						this.selectedEntity = null;
					}
					building.removeEntity(dead);
				}
			}
		}
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

		this.drawMovementIndicator(ctx);
	}

	private drawMovementIndicator(ctx: CanvasRenderingContext2D) {
		if (!(this.selectedEntity instanceof Unit)) {
			return;
		}

		if (this.hoveredGridX < 0 || this.hoveredGridY < 0) {
			return;
		}

		ctx.save();

		ctx.fillStyle = COLORS.MOVEMENT_INDICATOR_FILL;
		ctx.strokeStyle = COLORS.MOVEMENT_INDICATOR_STROKE;
		ctx.lineWidth = 2.0;

		ctx.beginPath();
		ctx.rect(this.hoveredGridX * GRID_SIZE, this.hoveredGridY * GRID_SIZE, GRID_SIZE, GRID_SIZE);
		ctx.fill();
		ctx.stroke();

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

		const textHeight = 20;
		this.players.forEach((player, index) => {
			ctx.fillText(player.getPlayerName(), 20, y + 20 + textHeight * index);
			ctx.fillText(`${player.getGold().toFixed(1)}`, 100, y + 20 + textHeight * index);
			ctx.fillText(`${player.getIron().toFixed(1)}`, 150, y + 20 + textHeight * index);
			ctx.fillText(`${player.getOil().toFixed(1)}`, 200, y + 20 + textHeight * index);
			ctx.fillText(`${player.getBuildings().length}`, 250, y + 20 + textHeight * index);
			ctx.fillText(`${player.getUnits().length}`, 300, y + 20 + textHeight * index);
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

	private drawBox(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
		ctx.font = "oswald 12px";
		ctx.fillStyle = COLORS.BOX_BG;
		ctx.strokeStyle = COLORS.BOX_TEXT;
		ctx.beginPath();
		ctx.roundRect(x, y, w, h, [5, 5, 5, 5]);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}

	private drawBoxLine(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
		ctx.strokeStyle = COLORS.BOX_TITLE;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + w, y);
		ctx.stroke();
		ctx.closePath();
	}

	private drawBoxTitle(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
		ctx.fillStyle = COLORS.BOX_TITLE;
		ctx.fillText(text, x, y);
	}

	private drawBoxText(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
		ctx.fillStyle = COLORS.BOX_TEXT;
		ctx.fillText(text, x, y);
	}

	private drawBoxResourceBuilding(ctx: CanvasRenderingContext2D, x: number, y: number, building: ResourceBuilding) {
		this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 3, `Amount: ${building.amount.toFixed(1)}`);
	}

	private drawBoxEntityButton(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fillColor: string) {
		ctx.save();

		ctx.fillStyle = fillColor;
		ctx.strokeStyle = COLORS.BOX_ENTITY_STROKE;
		ctx.beginPath();
		ctx.roundRect(x, y, w, h, [5, 5, 5, 5]);
		ctx.fill();
		ctx.stroke();

		ctx.restore();
	}

	private drawBoxProductionBuilding(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, building: ProductionBuilding) {
		this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 3, `Gold Cost: ${building.costGold}`);
		this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 4, `Iron Cost: ${building.costIron}`);
		this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 5, `Oil Cost: ${building.costOil}`);

		this.drawBoxLine(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 7, w - Game.MENU_PADDING * 2);
		this.drawBoxTitle(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 8, "Units");

		let xx = x + Game.MENU_PADDING;
		let yy = y + Game.MENU_TEXT_HEIGHT * 9;
		let c = 0;

		building.productionStore.forEach((unit) => {
			const isHovered = this.hoveredEntity === unit;

			if (isHovered) {
				this.drawBoxEntityButton(ctx, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT, COLORS.BOX_ENTITY_HOVER);
			} else {
				this.drawBoxEntityButton(ctx, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT, COLORS.BOX_ENTITY_FILL);
			}

			ctx.drawImage(unit.image, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT);

			c = (c + 1) % Game.MENU_ITEM_COLUMNS;

			if (c % Game.MENU_ITEM_COLUMNS === 0) {
				xx = x + Game.MENU_PADDING;
				yy += GRID_SIZE + Game.MENU_PADDING;
			} else {
				xx += GRID_SIZE + Game.MENU_PADDING * 2;
			}
		});

		this.drawBoxLine(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 22, w - Game.MENU_PADDING * 2);
		this.drawBoxTitle(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 23, `Queue: ${building.productionQueue.length}`);

		c = 0;
		xx = x + Game.MENU_PADDING;
		yy = y + Game.MENU_TEXT_HEIGHT * 24;

		if (building.productionQueue.length > 0) {
			building.productionQueue.forEach((unit, index) => {
				if (index >= 6) {
					return;
				}

				this.drawBoxEntityButton(ctx, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT, COLORS.BOX_ENTITY_FILL);
				ctx.drawImage(unit.image, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT);

				this.drawBoxTitle(ctx, xx, yy + GRID_SIZE + 12, `${unit.getBuildProgress().toFixed(1)} / ${unit.getTimeToBuild()}`);

				c = (c + 1) % Game.MENU_ITEM_COLUMNS;

				if (c % Game.MENU_ITEM_COLUMNS === 0) {
					xx = x + Game.MENU_PADDING;
					yy += GRID_SIZE + Game.MENU_PADDING * 2;
				} else {
					xx += GRID_SIZE + Game.MENU_PADDING * 2;
				}
			});
		}
	}

	private drawBoxUnit(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, unit: Unit) {
		this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 3, `Gold Cost: ${unit.costGold}`);
		this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 4, `Iron Cost: ${unit.costIron}`);
		this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 5, `Oil Cost: ${unit.costOil}`);

		this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 7, `life: ${unit.currentLife}/${unit.life}`);
		this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 8, `Status: ${unit.status}`);

		if (unit.status === "moving") {
			this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 9, `Time left: ${unit.getTimeToDestination().toFixed(1)}s`);
		}

		this.drawBoxWeaponsSection(ctx, x, y + Game.MENU_TEXT_HEIGHT * 10, "Weapons Supported", unit.getWeaponsSupported(), true);
		this.drawBoxWeaponsSection(ctx, x, y + Game.MENU_TEXT_HEIGHT * 18, "Weapons Equipped", unit.getWeaponsEquipped(), false);

		// Draw weapon production queue
		const queue = unit.getWeaponProductionQueue();
		this.drawBoxLine(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 24, w - Game.MENU_PADDING * 2);
		this.drawBoxTitle(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 25, `Weapon Queue: ${queue.length}`);

		let c = 0;
		let xx = x + Game.MENU_PADDING;
		let yy = y + Game.MENU_TEXT_HEIGHT * 26;

		if (queue.length > 0) {
			queue.forEach((weapon, index) => {
				if (index >= 6) {
					return;
				}

				this.drawBoxEntityButton(ctx, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT, COLORS.BOX_ENTITY_FILL);
				ctx.drawImage(weapon.image, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT);

				this.drawBoxTitle(ctx, xx, yy + GRID_SIZE + 12, `${weapon.getBuildProgress().toFixed(1)} / ${weapon.getTimeToBuild()}`);

				c = (c + 1) % Game.MENU_ITEM_COLUMNS;

				if (c % Game.MENU_ITEM_COLUMNS === 0) {
					xx = x + Game.MENU_PADDING;
					yy += GRID_SIZE + Game.MENU_PADDING * 2;
				} else {
					xx += GRID_SIZE + Game.MENU_PADDING * 2;
				}
			});
		}
	}

	private drawBoxWeaponsSection(ctx: CanvasRenderingContext2D, x: number, y: number, title: string, weapons: Weapon[], hoverable: boolean) {
		this.drawBoxLine(ctx, x + Game.MENU_PADDING, y, Game.MENU_WIDTH - Game.MENU_PADDING * 2);
		this.drawBoxTitle(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT, title);

		if (weapons.length === 0) {
			this.drawBoxText(ctx, x + Game.MENU_PADDING, y + Game.MENU_TEXT_HEIGHT * 2, "None");
			return y + Game.MENU_TEXT_HEIGHT * 3;
		}

		let xx = x + Game.MENU_PADDING;
		let yy = y + Game.MENU_TEXT_HEIGHT * 2;
		let c = 0;

		weapons.forEach((weapon) => {
			const isHovered = hoverable && this.hoveredEntity === weapon;

			if (isHovered) {
				this.drawBoxEntityButton(ctx, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT, COLORS.BOX_ENTITY_HOVER);
			} else {
				this.drawBoxEntityButton(ctx, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT, COLORS.BOX_ENTITY_FILL);
			}

			ctx.drawImage(weapon.image, xx, yy, Game.MENU_ITEM_WIDTH, Game.MENU_ITEM_HEIGHT);

			c = (c + 1) % Game.MENU_ITEM_COLUMNS;

			if (c % Game.MENU_ITEM_COLUMNS === 0) {
				xx = x + Game.MENU_PADDING;
				yy += GRID_SIZE + Game.MENU_PADDING * 2;
			} else {
				xx += GRID_SIZE + Game.MENU_PADDING * 2;
			}
		});

		return y + Game.MENU_TEXT_HEIGHT * 2 + Math.ceil(weapons.length / Game.MENU_ITEM_COLUMNS) * (GRID_SIZE + Game.MENU_PADDING * 2);
	}

	private drawSelectedEntityDetails(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.selectedEntity) {
			const entity = this.selectedEntity;

			const w = Game.MENU_WIDTH;
			const h = Game.MENU_HEIGHT;
			const x = this.board.offsetWidth - w - Game.MENU_MARGIN + this.board.scrollLeft;
			const y = Game.MENU_MARGIN + this.board.scrollTop;

			this.drawBox(ctx, x, y, w, h);
			this.drawBoxTitle(ctx, x + Game.MENU_PADDING, y + Game.MENU_PADDING * 2, entity.name);

			ctx.drawImage(entity.image, x + w - Game.MENU_BUILDING_SIZE - Game.MENU_PADDING, y + Game.MENU_PADDING, Game.MENU_BUILDING_SIZE, Game.MENU_BUILDING_SIZE);

			if (entity instanceof ResourceBuilding) {
				this.drawBoxResourceBuilding(ctx, x, y, entity);
			}

			if (entity instanceof ProductionBuilding) {
				this.drawBoxProductionBuilding(ctx, x, y, w, entity);
			}

			if (entity instanceof Unit) {
				this.drawBoxUnit(ctx, x, y, w, entity);
			}
		}

		ctx.restore();
	}
}
