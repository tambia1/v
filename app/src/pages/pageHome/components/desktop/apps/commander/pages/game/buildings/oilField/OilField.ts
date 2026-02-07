import { UtilsImage } from "../../core/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/oilField.png";

type OilFieldParams = {
	x: number;
	y: number;
};

export class OilField extends ResourceBuilding {
	constructor(params: OilFieldParams) {
		super({
			amount: 0,
			producedPerSecond: 1,
			x: params.x,
			y: params.y,
		});

		this.name = "Oil Field";
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
