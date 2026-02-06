import { Position } from "../map/Position";
import { Building } from "./Building";

type ResourceBuildingParams = {
	amount: number;
	producedPerSecond: number;
	x: number;
	y: number;
};

export abstract class ResourceBuilding extends Building {
	public amount: number;
	public producedPerSecond: number;

	constructor(params: ResourceBuildingParams) {
		super();

		this.amount = params.amount;
		this.producedPerSecond = params.producedPerSecond;
		this.position = new Position({ x: params.x, y: params.y, w: 1, h: 1 });
	}

	public update(timeDif: number) {
		this.amount += (timeDif / 1000) * this.producedPerSecond;
	}
}
