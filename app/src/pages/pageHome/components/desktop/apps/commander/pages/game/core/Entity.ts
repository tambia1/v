import { UtilsImage } from "../utils/UtilsImage";
import { Position } from "./Position";

type EntityParams = {
	name?: string;
	image?: HTMLImageElement;
	position?: Position;
};

export abstract class Entity {
	public name: string;
	public image: HTMLImageElement;
	public position: Position;

	constructor(params: EntityParams = {}) {
		this.name = params.name || "";
		this.image = params.image || UtilsImage.getImage("");
		this.position = params.position || new Position();
	}
}
