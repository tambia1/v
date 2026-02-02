import { UtilsImage } from "../../core/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/ironMine.png";

export class IronMine extends ResourceBuilding {
	constructor() {
		super({
			amount: 0,
			producedPerDay: 100,
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
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
