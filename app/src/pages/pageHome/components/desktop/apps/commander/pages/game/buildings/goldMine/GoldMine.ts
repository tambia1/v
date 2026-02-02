import { UtilsImage } from "../../core/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/goldMine.png";

export class GoldMine extends ResourceBuilding {
	constructor() {
		super({
			amount: 0,
			producedPerDay: 100,
		});
	}

	public getAmountOfGold() {
		return this.getAmount();
	}

	public setAmountOfGold(amount: number) {
		this.setAmount(amount);
	}

	public getGoldProducedPerDay() {
		return this.getProducedPerDay();
	}

	public setGoldProducedPerDay(amount: number) {
		this.setProducedPerDay(amount);
	}

	public addGold(amount: number) {
		this.add(amount);
	}

	public removeGold(amount: number) {
		this.remove(amount);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
