import { UtilsImage } from "../../core/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/oilField.png";

export class OilField extends ResourceBuilding {
	constructor() {
		super({
			amount: 0,
			producedPerDay: 100,
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
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
