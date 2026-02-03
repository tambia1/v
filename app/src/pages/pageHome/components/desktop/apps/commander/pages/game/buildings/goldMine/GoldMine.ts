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
			producedPerDay: 100,
			x: params.x,
			y: params.y,
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
		ctx.drawImage(UtilsImage.getImage(image), this.position.x, this.position.y, this.position.w, this.position.h);
		ctx.restore();
	}
}
