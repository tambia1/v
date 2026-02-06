import { UtilsImage } from "../core/UtilsImage";

export abstract class Building {
	public name: string;
	public image: HTMLImageElement;

	public isSelected: boolean;

	constructor() {
		this.name = "";
		this.image = UtilsImage.getImage("");
		this.isSelected = false;
	}
	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
