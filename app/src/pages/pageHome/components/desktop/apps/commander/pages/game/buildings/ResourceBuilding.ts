import { Position } from "../core/Position";
import { Building } from "./Building";

type ResourceBuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	life: number;

	amount: number;
	producedPerSecond: number;
};

export abstract class ResourceBuilding extends Building {
	public amount: number;
	public producedPerSecond: number;

	constructor(params: ResourceBuildingParams) {
		super({
			name: params.name,
			image: params.image,
			position: params.position,
			life: params.life,
		});

		this.amount = params.amount;
		this.producedPerSecond = params.producedPerSecond;
	}

	public override update(timeDif: number) {
		super.update(timeDif);

		this.amount += (timeDif / 1000) * this.producedPerSecond;
	}
}
