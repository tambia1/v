import { UtilsImage } from "../core/UtilsImage";
import { Position } from "../map/Position";

export abstract class Building {
	public name: string;
	public image: HTMLImageElement;

	public position: Position;
	public isSelected: boolean;

	constructor() {
		this.name = "";
		this.image = UtilsImage.getImage("");
		this.position = new Position();
		this.isSelected = false;
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
