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
		super({ x: params.x, y: params.y, w: 1, h: 1 });

		this.amount = params.amount;
		this.producedPerSecond = params.producedPerSecond;
	}

	public update(timeDif: number) {
		this.amount += (timeDif / 1000) * this.producedPerSecond;
	}
}
