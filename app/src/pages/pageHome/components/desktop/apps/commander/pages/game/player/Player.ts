import { GoldMine } from "../buildings/goldMine/GoldMine";
import { IronMine } from "../buildings/ironMine/IronMine";
import { OilField } from "../buildings/oilField/OilField";
import { ProductionBuilding } from "../buildings/ProductionBuilding";
import { ResourceBuilding } from "../buildings/ResourceBuilding";
import { Entity } from "../core/Entity";
import { Position } from "../core/Position";

export class Player {
	private playerName: string;
	private color: string;

	private resourceBuildings: ResourceBuilding[];
	private productionBuildings: ProductionBuilding[];

	constructor(playerName: string, color: string) {
		this.playerName = playerName;
		this.color = color;

		this.resourceBuildings = [];
		this.productionBuildings = [];
	}

	public getPlayerName() {
		return this.playerName;
	}

	public getColor() {
		return this.color;
	}

	public getResourceBuildings() {
		return this.resourceBuildings;
	}

	public getProductionBuildings() {
		return this.productionBuildings;
	}

	public addResourceBuilding(resourceBuilding: ResourceBuilding) {
		this.resourceBuildings.push(resourceBuilding);
	}

	public addProductionBuilding(productionBuilding: ProductionBuilding) {
		this.productionBuildings.push(productionBuilding);
	}

	public isAlive() {
		return this.resourceBuildings.length > 0 || this.productionBuildings.length > 0;
	}

	public getGold() {
		let gold = 0;

		this.resourceBuildings.forEach((resourceBuilding) => {
			if (resourceBuilding instanceof GoldMine) {
				gold += resourceBuilding.amount;
			}
		});

		return gold;
	}

	public getIron() {
		let iron = 0;

		this.resourceBuildings.forEach((resourceBuilding) => {
			if (resourceBuilding instanceof IronMine) {
				iron += resourceBuilding.amount;
			}
		});

		return iron;
	}

	public getOil() {
		let oil = 0;

		this.resourceBuildings.forEach((resourceBuilding) => {
			if (resourceBuilding instanceof OilField) {
				oil += resourceBuilding.amount;
			}
		});

		return oil;
	}

	public getUnits() {
		const units: Entity[] = [];

		this.productionBuildings.forEach((productionBuilding) => {
			units.push(...productionBuilding.products);
		});

		return units;
	}

	public getBuildings() {
		const buildings: Entity[] = [];

		this.resourceBuildings.forEach((resourceBuilding) => {
			buildings.push(resourceBuilding);
		});

		this.productionBuildings.forEach((productionBuilding) => {
			buildings.push(productionBuilding);
		});

		return buildings;
	}

	public update(timeDif: number) {
		this.resourceBuildings.forEach((resourceBuilding) => {
			resourceBuilding.update(timeDif);
		});

		this.productionBuildings.forEach((productionBuilding) => {
			productionBuilding.update(timeDif);

			productionBuilding.products.forEach((unit) => {
				unit.update(timeDif);
			});
		});
	}

	private drawBackgrounds(ctx: CanvasRenderingContext2D, position: Position) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.rect(position.x, position.y, position.w, position.h);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}

	public draw(ctx: CanvasRenderingContext2D) {
		// Draw buildings
		this.resourceBuildings.forEach((resourceBuilding) => {
			if (resourceBuilding.isHovered) {
				this.drawBackgrounds(ctx, resourceBuilding.position);
			}

			resourceBuilding.draw(ctx);
		});

		this.productionBuildings.forEach((productionBuilding) => {
			if (productionBuilding.isHovered) {
				this.drawBackgrounds(ctx, productionBuilding.position);
			}

			productionBuilding.draw(ctx);

			// Draw units
			productionBuilding.products.forEach((unit) => {
				if (unit.isHovered) {
					this.drawBackgrounds(ctx, unit.position);
				}

				unit.draw(ctx);
			});
		});
	}
}
