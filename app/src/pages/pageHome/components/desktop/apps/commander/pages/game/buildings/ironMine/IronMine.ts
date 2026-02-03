import { UtilsImage } from "../../core/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/ironMine.png";

type IronMineParams = {
	x: number;
	y: number;
};

export class IronMine extends ResourceBuilding {
	constructor(params: IronMineParams) {
		super({
			amount: 0,
			producedPerDay: 100,
			x: params.x,
			y: params.y,
		});
	}

	public getAmountOfIron() {
		return this.getAmount();
	}

	public setAmountOfIron(amount: number) {
		this.setAmount(amount);
	}

	public getIronProducedPerDay() {
		return this.getProducedPerDay();
	}

	public setIronProducedPerDay(amount: number) {
		this.setProducedPerDay(amount);
	}

	public addIron(amount: number) {
		this.add(amount);
	}

	public removeIron(amount: number) {
		this.remove(amount);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.getPosition().x, this.getPosition().y, this.getPosition().w, this.getPosition().h);
		ctx.restore();
	}
}
