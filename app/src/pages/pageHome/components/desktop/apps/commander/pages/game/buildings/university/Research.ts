import { Drawable } from "../../core/Drawable";
import { Hoverable } from "../../core/Hoverable";

type ResearchParams = {
	name: string;
	image: HTMLImageElement;
	timeToResearch: number;
};

export abstract class Research implements Drawable, Hoverable {
	public name: string;
	public image: HTMLImageElement;
	public timeToResearch: number;
	public isHovered: boolean;

	constructor(params: ResearchParams) {
		this.name = params.name;
		this.image = params.image;
		this.timeToResearch = params.timeToResearch;

		this.isHovered = false;
	}

	public setIsHovered(value: boolean) {
		this.isHovered = value;
	}

	public getIsHovered(): boolean {
		return this.isHovered;
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
