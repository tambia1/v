import { Unit } from "../units/Unit";

type ProductionBuildingParams = {
	costGold: number;
	costIron: number;
	costOil: number;
	unitsCanBeProduced: Unit[];
};

export abstract class ProductionBuilding {
	protected costGold: number;
	protected costIron: number;
	protected costOil: number;
	protected unitsCanBeProduced: Unit[];
	protected productionQueue: Unit[];
	protected producedUnits: Unit[];
	protected x: number;
	protected y: number;
	protected w: number;
	protected h: number;

	constructor(params: ProductionBuildingParams) {
		this.costGold = params.costGold;
		this.costIron = params.costIron;
		this.costOil = params.costOil;
		this.unitsCanBeProduced = params.unitsCanBeProduced;
		this.productionQueue = [];
		this.producedUnits = [];

		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
	}

	public getCostGold() {
		return this.costGold;
	}

	public getCostIron() {
		return this.costIron;
	}

	public getCostOil() {
		return this.costOil;
	}

	public getUnitsTheBuildingCanProduce() {
		return this.unitsCanBeProduced;
	}

	public getProducedUnits() {
		return this.producedUnits;
	}

	public getProductionQueue() {
		return this.productionQueue;
	}

	public addToProductionQueue(unit: Unit) {
		this.productionQueue.push(unit);
	}

	public removeFromProductionQueue(unit: Unit) {
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

	public setXY(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public setWH(w: number, h: number) {
		this.w = w;
		this.h = h;
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
