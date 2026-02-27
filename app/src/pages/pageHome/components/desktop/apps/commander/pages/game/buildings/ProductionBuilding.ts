import { Position } from "../core/Position";
import { Unit } from "../units/Unit";
import { Building } from "./Building";

type ProductionBuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	life: number;

	costGold: number;
	costIron: number;
	costOil: number;

	productionStore: Unit[];
};

export abstract class ProductionBuilding extends Building {
	public costGold: number;
	public costIron: number;
	public costOil: number;
	public productionStore: Unit[];
	public productionQueue: Unit[];
	public units: Unit[];

	constructor(params: ProductionBuildingParams) {
		super({
			name: params.name,
			image: params.image,
			position: params.position,
			life: params.life,
		});

		this.costGold = params.costGold;
		this.costIron = params.costIron;
		this.costOil = params.costOil;
		this.productionStore = params.productionStore;
		this.productionQueue = [];
		this.units = [];
	}

	public addUnitToProductionQueue(unit: Unit) {
		this.productionQueue.push(unit);
	}

	public removeUnitFromProductionQueue(unit: Unit) {
		const index = this.productionQueue.indexOf(unit);
		if (index > -1) {
			this.productionQueue.splice(index, 1);
		}
	}

	public addUnit(unit: Unit) {
		this.units.push(unit);
	}

	public removeUnit(unit: Unit) {
		const index = this.units.indexOf(unit);
		if (index > -1) {
			this.units.splice(index, 1);
		}
	}

	public override update(timeDif: number) {
		super.update(timeDif);

		if (this.productionQueue.length === 0) {
			return;
		}

		const currentUnit = this.productionQueue[0];
		const progressToAdd = timeDif / 1000;
		currentUnit.addBuildProgress(progressToAdd);

		if (currentUnit.isBuilt()) {
			this.productionQueue.shift();
			this.units.push(currentUnit);
		}
	}
}
