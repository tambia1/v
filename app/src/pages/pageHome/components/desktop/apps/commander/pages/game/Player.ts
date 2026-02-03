import { GoldMine } from "./buildings/goldMine/GoldMine";
import { IronMine } from "./buildings/ironMine/IronMine";
import { OilField } from "./buildings/oilField/OilField";
import { ProductionBuilding } from "./buildings/ProductionBuilding";
import { ResourceBuilding } from "./buildings/ResourceBuilding";
import { University } from "./buildings/university/University";
import { Unit } from "./units/Unit";

export class Player {
	private playerName: string;

	private resourceBuildings: ResourceBuilding[];
	private productionBuildings: ProductionBuilding[];

	constructor(playerName: string) {
		this.playerName = playerName;

		this.resourceBuildings = [new GoldMine({ x: 15, y: 15 }), new IronMine({ x: 16, y: 15 }), new OilField({ x: 17, y: 15 })];
		this.productionBuildings = [new University({ x: 15, y: 16 })];
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

	public update(timeDif: number) {
		for (let i = 0; i < this.resourceBuildings.length; i++) {
			this.resourceBuildings[i].update(timeDif);
		}

		for (let i = 0; i < this.productionBuildings.length; i++) {
			this.productionBuildings[i].update(timeDif);
		}
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
				gold += resourceBuilding.getAmountOfGold();
			}
		});

		return gold;
	}

	public getIron() {
		let iron = 0;

		this.resourceBuildings.forEach((resourceBuilding) => {
			if (resourceBuilding instanceof IronMine) {
				iron += resourceBuilding.getAmountOfIron();
			}
		});

		return iron;
	}

	public getOil() {
		let oil = 0;

		this.resourceBuildings.forEach((resourceBuilding) => {
			if (resourceBuilding instanceof OilField) {
				oil += resourceBuilding.getAmountOfOil();
			}
		});

		return oil;
	}

	public getUnits() {
		const units: Unit[] = [];

		this.productionBuildings.forEach((productionBuilding) => {
			units.push(...productionBuilding.getProducedUnits());
		});

		return units;
	}

	public getBuildings() {
		const buildings: (ResourceBuilding | ProductionBuilding)[] = [];

		this.resourceBuildings.forEach((resourceBuilding) => {
			buildings.push(resourceBuilding);
		});

		this.productionBuildings.forEach((productionBuilding) => {
			buildings.push(productionBuilding);
		});

		return buildings;
	}

	public draw(ctx: CanvasRenderingContext2D) {
		for (let i = 0; i < this.resourceBuildings.length; i++) {
			this.resourceBuildings[i].draw(ctx);
		}

		for (let i = 0; i < this.productionBuildings.length; i++) {
			this.productionBuildings[i].draw(ctx);
		}
	}
}
