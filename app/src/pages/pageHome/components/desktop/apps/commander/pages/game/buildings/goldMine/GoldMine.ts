import { UtilsImage } from "../../core/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/goldMine.png";

type GoldMineParams = {
	x: number;
	y: number;
};

export class GoldMine extends ResourceBuilding {
	constructor(params: GoldMineParams) {
		super({
			amount: 0,
			producedPerSecond: 1,
			x: params.x,
			y: params.y,
		});

		this.name = "Gold Mine";
		this.image = UtilsImage.getImage(image);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.isSelected) {
			const centerX = this.getCenterX();
			const centerY = this.getCenterY();

			ctx.translate(centerX, centerY);
			ctx.scale(1.3, 1.3);
			ctx.translate(-centerX, -centerY);
		}

		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);

		ctx.restore();
	}
}
