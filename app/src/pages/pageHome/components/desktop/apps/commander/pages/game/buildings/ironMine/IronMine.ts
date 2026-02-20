import { Position } from "../../core/Position";
import { State } from "../../core/State";
import { UtilsImage } from "../../utils/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/ironMine.png";

type IronMineParams = {
	x: number;
	y: number;
};

export class IronMine extends ResourceBuilding {
	constructor(params: IronMineParams) {
		super({
			name: "Iron Mine",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: 1,
				h: 1,
			}),
			state: new State({ isSelected: false, isHovered: false }),

			amount: 0,
			producedPerSecond: 1,
		});
	}

	public setIsSelected(value: boolean) {
		this.state.isSelected = value;
	}

	public getIsSelected() {
		return this.state.isSelected;
	}

	public setIsHovered(value: boolean) {
		this.state.isHovered = value;
	}

	public getIsHovered() {
		return this.state.isHovered;
	}

	public update(_timeDif: number) {}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.state.isHovered) {
			ctx.beginPath();
			ctx.fillStyle = "#aaffaaaa";
			ctx.rect(this.position.x, this.position.y, this.position.w, this.position.h);
			ctx.fill();
			ctx.closePath();
		}

		if (this.state.isSelected) {
			const centerX = this.position.getCenterX();
			const centerY = this.position.getCenterY();

			ctx.translate(centerX, centerY);
			ctx.scale(1.3, 1.3);
			ctx.translate(-centerX, -centerY);
		}

		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);

		ctx.restore();
	}
}
