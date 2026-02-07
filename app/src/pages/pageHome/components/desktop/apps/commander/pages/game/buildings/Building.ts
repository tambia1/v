import { Entity } from "../Entity";

type BuildingParams = {
	x?: number;
	y?: number;
	w?: number;
	h?: number;
};

export abstract class Building extends Entity {
	public isSelected: boolean;

	constructor(params: BuildingParams = {}) {
		super(params);
		this.isSelected = false;
	}
}
