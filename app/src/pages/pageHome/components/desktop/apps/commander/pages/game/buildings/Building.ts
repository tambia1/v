import { COLORS } from "../Constants";
import { Drawable } from "../core/Drawable";
import { Entity } from "../core/Entity";
import { Hoverable } from "../core/Hoverable";
import { Position } from "../core/Position";
import { Selectable } from "../core/Selectable";
import { Touchable } from "../core/Touchable";
import { Updatable } from "../core/Updatable";
import { Animation } from "../utils/Animation";

type BuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
};

export abstract class Building extends Entity implements Drawable, Updatable, Selectable, Hoverable, Touchable {
	protected animationScale: Animation;
	public position: Position;
	public isSelected = false;
	public isHovered = false;

	constructor(params: BuildingParams) {
		super(params);

		this.position = params.position;

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

	public isTouched(x: number, y: number): boolean {
		return this.position.isContains(x, y);
	}

	public onTouchStart(): void {}

	public onTouchEnd(): void {
		this.setIsSelected(true);
	}

	public onTouchHoverStart(): void {
		this.setIsHovered(true);
	}

	public onTouchHoverEnd(): void {
		this.setIsHovered(false);
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
