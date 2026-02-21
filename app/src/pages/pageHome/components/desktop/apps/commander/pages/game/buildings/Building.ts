import { COLORS } from "../Constants";
import { Entity } from "../core/Entity";
import { Drawable, Hoverable, Selectable, Updatable } from "../core/Interfaces";
import { Position } from "../core/Position";
import { Animation } from "../utils/Animation";

type BuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
};

export abstract class Building extends Entity implements Drawable, Updatable, Selectable, Hoverable {
	protected animationScale: Animation;
	public isSelected = false;
	public isHovered = false;

	constructor(params: BuildingParams) {
		super(params);

		this.animationScale = new Animation({
			time: 300,
			routes: [
				[1, 1.3],
				[1.3, 1],
			],
			timing: Animation.TIMING_EASE,
			onCalculate: null,
			callbacks: [],
		});

		this.animationScale.resume();
	}

	public setIsSelected(value: boolean): void {
		if (this.isSelected !== value) {
			this.animationScale.reset();
		}

		this.isSelected = value;
	}

	public getIsSelected(): boolean {
		return this.isSelected;
	}

	public setIsHovered(value: boolean): void {
		this.isHovered = value;
	}

	public getIsHovered(): boolean {
		return this.isHovered;
	}

	public update(_timeDif: number): void {
		this.animationScale.calculate();
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		ctx.save();

		if (this.isHovered) {
			ctx.beginPath();
			ctx.fillStyle = COLORS.BUILDING_HOVER;
			ctx.rect(this.position.x, this.position.y, this.position.w, this.position.h);
			ctx.fill();
			ctx.closePath();
		}

		const centerX = this.position.getCenterX();
		const centerY = this.position.getCenterY();
		const scale = this.isSelected ? this.animationScale.results[0] : this.animationScale.results[1];

		ctx.translate(centerX, centerY);
		ctx.scale(scale, scale);
		ctx.translate(-centerX, -centerY);

		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);

		ctx.restore();
	}
}
