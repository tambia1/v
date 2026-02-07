import { Entity } from "../core/Entity";
import { Position } from "../core/Position";
import { State } from "../core/State";

type BuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	state: State;
};

export abstract class Building extends Entity {
	constructor(params: BuildingParams) {
		super(params);
	}
}
