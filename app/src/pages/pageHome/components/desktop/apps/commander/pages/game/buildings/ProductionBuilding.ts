import { UtilsImage } from "../core/UtilsImage";
import { Position } from "../map/Position";
import { Unit } from "../units/Unit";
import { Building } from "./Building";

type ProductionBuildingParams = {
	costGold: number;
	costIron: number;
	costOil: number;
	unitsCanBeProduced: Unit[];
	x: number;
	y: number;
};

export abstract class ProductionBuilding extends Building {
	public costGold: number;
	public costIron: number;
	public costOil: number;
	public unitsCanBeProduced: Unit[];
	public productionQueue: Unit[];
	public producedUnits: Unit[];
	public position: Position;

	constructor(params: ProductionBuildingParams) {
		super();

		this.costGold = params.costGold;
		this.costIron = params.costIron;
		this.costOil = params.costOil;
		this.unitsCanBeProduced = params.unitsCanBeProduced;
		this.productionQueue = [];
		this.producedUnits = [];
		this.position = new Position({ x: params.x, y: params.y, w: 1, h: 1 });

		this.name = "";
		this.image = UtilsImage.getImage("");
		this.isSelected = false;
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

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
