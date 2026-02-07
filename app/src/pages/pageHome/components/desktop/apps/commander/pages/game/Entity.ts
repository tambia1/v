import { UtilsImage } from "./core/UtilsImage";

type EntityParams = {
	name?: string;
	image?: HTMLImageElement;
	x?: number;
	y?: number;
	w?: number;
	h?: number;
};

export abstract class Entity {
	public name: string;
	public image: HTMLImageElement;

	public x: number;
	public y: number;
	public w: number;
	public h: number;

	constructor(params: EntityParams = {}) {
		this.name = params.name || "";
		this.image = params.image || UtilsImage.getImage("");

		this.x = params.x || 0;
		this.y = params.y || 0;
		this.w = params.w || 0;
		this.h = params.h || 0;
	}

	public getCenterX() {
		return this.x + this.w / 2;
	}

	public getCenterY() {
		return this.y + this.h / 2;
	}

	public distanceTo(other: Entity) {
		const dx = this.getCenterX() - other.getCenterX();
		const dy = this.getCenterY() - other.getCenterY();
		return Math.sqrt(dx * dx + dy * dy);
	}

	public isContains(x: number, y: number) {
		return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
	}

	public isOverlaps(other: { x: number; y: number; w: number; h: number }) {
		return !(this.x + this.w < other.x || other.x + other.w < this.x || this.y + this.h < other.y || other.y + other.h < this.y);
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
