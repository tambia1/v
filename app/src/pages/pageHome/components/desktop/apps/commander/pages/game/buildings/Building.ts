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
	life: number;
};

export abstract class Building implements Entity, Drawable, Updatable, Selectable, Hoverable, Touchable {
	public name: string;
	public image: HTMLImageElement;
	public life: number;
	public currentLife: number;
	public position: Position;
	public isSelected = false;
	public isHovered = false;

	protected animationScale: Animation;

	constructor(params: BuildingParams) {
		this.name = params.name;
		this.image = params.image;
		this.position = params.position;
		this.life = params.life;
		this.currentLife = params.life;

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

	public setIsSelected(value: boolean) {
		if (this.isSelected !== value) {
			this.animationScale.reset();
		}

		this.isSelected = value;
	}

	public getIsSelected() {
		return this.isSelected;
	}

	public setIsHovered(value: boolean) {
		this.isHovered = value;
	}

	public getIsHovered() {
		return this.isHovered;
	}

	public isTouched(x: number, y: number) {
		return this.position.isContains(x, y);
	}

	public onTouchStart() {}

	public onTouchEnd() {
		this.setIsSelected(true);
	}

	public onTouchHoverStart() {
		this.setIsHovered(true);
	}

	public onTouchHoverEnd() {
		this.setIsHovered(false);
	}

	public update(_timeDif: number) {
		this.animationScale.calculate();
	}

	public drawLife(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const scaleX = ctx.getTransform().a;
		const scaleY = ctx.getTransform().d;
		ctx.scale(1 / scaleX, 1 / scaleY);

		ctx.beginPath();
		ctx.rect(5, 40 - 10, 40 - 5 * 2, 5);
		ctx.strokeStyle = COLORS.UNIT_LIFE_STROKE;
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.closePath();

		const lifeRatio = this.currentLife / this.life;

		ctx.beginPath();
		ctx.rect(5, 40 - 10, (40 - 5 * 2) * lifeRatio, 5);
		ctx.fillStyle = COLORS.UNIT_LIFE_FILL;
		ctx.fill();
		ctx.closePath();

		ctx.restore();
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.drawLife(ctx);

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
