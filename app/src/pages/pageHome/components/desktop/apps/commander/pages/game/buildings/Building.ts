import { Entity } from "../core/Entity";
import { Position } from "../core/Position";
import { State } from "../core/State";
import { Animation } from "../utils/Animation";

type BuildingParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	state: State;
};

export abstract class Building extends Entity {
	protected animationScale: Animation;

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
		if (this.state.isSelected !== value) {
			this.animationScale.reset();
		}

		this.state.isSelected = value;
	}

	public getIsSelected(): boolean {
		return this.state.isSelected;
	}

	public setIsHovered(value: boolean): void {
		this.state.isHovered = value;
	}

	public getIsHovered(): boolean {
		return this.state.isHovered;
	}

	public update(_timeDif: number): void {
		this.animationScale.calculate();
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		ctx.save();

		if (this.state.isHovered) {
			ctx.beginPath();
			ctx.fillStyle = "#aaffaaff";
			ctx.rect(this.position.x, this.position.y, this.position.w, this.position.h);
			ctx.fill();
			ctx.closePath();
		}

		const centerX = this.position.getCenterX();
		const centerY = this.position.getCenterY();
		const scale = this.state.isSelected ? this.animationScale.results[0] : this.animationScale.results[1];

		ctx.translate(centerX, centerY);
		ctx.scale(scale, scale);
		ctx.translate(-centerX, -centerY);

		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);

		ctx.restore();
	}
}
