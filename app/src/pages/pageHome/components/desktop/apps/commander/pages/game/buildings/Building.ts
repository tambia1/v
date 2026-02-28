import { COLORS } from "../Constants";
import { Drawable } from "../core/Drawable";
import { Entity } from "../core/Entity";
import { Hoverable } from "../core/Hoverable";
import { Position } from "../core/Position";
import { Selectable } from "../core/Selectable";
import { Updatable } from "../core/Updatable";
import { Animation } from "../utils/Animation";

type BuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	life: number;
};

export abstract class Building implements Entity, Drawable, Updatable, Selectable, Hoverable {
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

	public update(_timeDif: number) {
		this.animationScale.calculate();
	}

	public drawLife(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const barWidth = this.position.w - 10;
		const barHeight = 5;
		const barX = this.position.x + 5;
		const barY = this.position.y + this.position.h - 10;

		ctx.beginPath();
		ctx.rect(barX, barY, barWidth, barHeight);
		ctx.strokeStyle = COLORS.UNIT_LIFE_STROKE;
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.closePath();

		const lifeRatio = this.currentLife / this.life;
		ctx.beginPath();
		ctx.rect(barX, barY, barWidth * lifeRatio, barHeight);
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
