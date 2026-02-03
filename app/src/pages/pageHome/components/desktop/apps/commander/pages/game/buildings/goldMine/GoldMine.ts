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

		this.position.w = 20;
		this.position.h = 20;
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
		ctx.translate(this.getPosition().x + this.getPosition().w, this.getPosition().y + this.getPosition().h);

		ctx.drawImage(UtilsImage.getImage(image), this.getPosition().x, this.getPosition().y, this.getPosition().w, this.getPosition().h);
		ctx.restore();
	}
}
