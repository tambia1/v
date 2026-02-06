import { Entity } from "../Entity";

export abstract class Building extends Entity {
	public isSelected: boolean;

	constructor() {
		super();
		this.isSelected = false;
	}
}
