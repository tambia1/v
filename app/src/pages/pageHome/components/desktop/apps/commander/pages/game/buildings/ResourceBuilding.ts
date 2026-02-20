import { Position } from "../core/Position";
import { State } from "../core/State";
import { Building } from "./Building";

type ResourceBuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	state: State;

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
			state: params.state,
		});

		this.amount = params.amount;
		this.producedPerSecond = params.producedPerSecond;
	}

	public override update(timeDif: number) {
		super.update(timeDif);

		this.amount += (timeDif / 1000) * this.producedPerSecond;
	}
}
