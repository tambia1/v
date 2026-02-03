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
			producedPerDay: 100,
			x: params.x,
			y: params.y,
		});
	}

	public getAmountOfOil() {
		return this.getAmount();
	}

	public setAmountOfOil(amount: number) {
		this.setAmount(amount);
	}

	public getOilProducedPerDay() {
		return this.getProducedPerDay();
	}

	public setOilProducedPerDay(amount: number) {
		this.setProducedPerDay(amount);
	}

	public addOil(amount: number) {
		this.add(amount);
	}

	public removeOil(amount: number) {
		this.remove(amount);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.getPosition().x, this.getPosition().y, this.getPosition().w, this.getPosition().h);
		ctx.restore();
	}
}
