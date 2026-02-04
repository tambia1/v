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
	}

	public override getName() {
		return "Oil Field";
	}

	public override getImage() {
		return UtilsImage.getImage(image);
	}

	public getAmountOfOil() {
		return this.getAmount();
	}

	public setAmountOfOil(amount: number) {
		this.setAmount(amount);
	}

	public getOilProducedPerDay() {
		return this.getProducedPerSecond();
	}

	public setOilProducedPerDay(amount: number) {
		this.setProducedPerSecond(amount);
	}

	public addOil(amount: number) {
		this.add(amount);
	}

	public removeOil(amount: number) {
		this.remove(amount);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.position.getIsSelected()) {
			const centerX = this.position.getCenterX();
			const centerY = this.position.getCenterY();

			ctx.translate(centerX, centerY);
			ctx.scale(1.3, 1.3);
			ctx.translate(-centerX, -centerY);
		}

		ctx.drawImage(UtilsImage.getImage(image), this.position.x, this.position.y, this.position.w, this.position.h);

		ctx.restore();
	}
}
