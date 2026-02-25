import { Building } from "../buildings/Building";
import { GoldMine } from "../buildings/goldMine/GoldMine";
import { IronMine } from "../buildings/ironMine/IronMine";
import { OilField } from "../buildings/oilField/OilField";
import { ProductionBuilding } from "../buildings/ProductionBuilding";
import { ResourceBuilding } from "../buildings/ResourceBuilding";
import { Unit } from "../units/Unit";

export class Player {
	private playerName: string;

	private resourceBuildings: ResourceBuilding[];
	private productionBuildings: ProductionBuilding[];

	constructor(playerName: string) {
		this.playerName = playerName;

		this.resourceBuildings = [];
		this.productionBuildings = [];
	}

	public getPlayerName() {
		return this.playerName;
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
		const units: Unit[] = [];

		this.productionBuildings.forEach((productionBuilding) => {
			units.push(...productionBuilding.units);
		});

		return units;
	}

	public getBuildings() {
		const buildings: Building[] = [];

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

			productionBuilding.units.forEach((unit) => {
				unit.update(timeDif);
			});
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.resourceBuildings.length; i++) {
			this.resourceBuildings[i].draw(ctx);
		}

		for (let i = 0; i < this.productionBuildings.length; i++) {
			this.productionBuildings[i].draw(ctx);

			this.productionBuildings[i].units.forEach((unit) => {
				unit.draw(ctx);
			});
		}
	}
}
