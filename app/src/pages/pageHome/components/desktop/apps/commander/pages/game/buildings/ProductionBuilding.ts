import { Position } from "../core/Position";
import { State } from "../core/State";
import { Unit } from "../units/Unit";
import { Building } from "./Building";

type ProductionBuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	state: State;

	costGold: number;
	costIron: number;
	costOil: number;
	unitsCanBeProduced: Unit[];
};

export abstract class ProductionBuilding extends Building {
	public costGold: number;
	public costIron: number;
	public costOil: number;
	public unitsCanBeProduced: Unit[];
	public productionQueue: Unit[];
	public producedUnits: Unit[];

	constructor(params: ProductionBuildingParams) {
		super({
			name: params.name,
			image: params.image,
			position: params.position,
			state: params.state,
		});

		this.costGold = params.costGold;
		this.costIron = params.costIron;
		this.costOil = params.costOil;
		this.unitsCanBeProduced = params.unitsCanBeProduced;
		this.productionQueue = [];
		this.producedUnits = [];
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

	public addProducedUnit(unit: Unit) {
		this.producedUnits.push(unit);
	}

	public removeProducedUnit(unit: Unit) {
		const index = this.producedUnits.indexOf(unit);
		if (index > -1) {
			this.producedUnits.splice(index, 1);
		}
	}

	public update(timeDif: number) {
		if (this.productionQueue.length === 0) {
			return;
		}

		const currentUnit = this.productionQueue[0];
		const progressToAdd = timeDif / 1000;
		currentUnit.addBuildProgress(progressToAdd);

		if (currentUnit.isBuilt()) {
			this.productionQueue.shift();
			this.producedUnits.push(currentUnit);
		}
	}
}
