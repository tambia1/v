import { UtilsImage } from "./core/UtilsImage";
import { Position } from "./map/Position";

export abstract class Entity {
	public name: string;
	public image: HTMLImageElement;
	public position: Position;

	constructor() {
		this.name = "";
		this.image = UtilsImage.getImage("");
		this.position = new Position();
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}

