import { UtilsImage } from "../../core/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/goldMine.png";

type GoldMineParams = {
	x: number;
	y: number;
};

export class GoldMine extends ResourceBuilding {
	private image: HTMLImageElement;

	constructor(params: GoldMineParams) {
		super({
			amount: 0,
			producedPerSecond: 1,
			x: params.x,
			y: params.y,
		});

		this.image = UtilsImage.getImage(image);
	}

	public override getName() {
		return "Gold Mine";
	}

	public override getImage() {
		return this.image;
	}

	public getAmountOfGold() {
		return this.getAmount();
	}

	public setAmountOfGold(amount: number) {
		this.setAmount(amount);
	}

	public getGoldProducedPerDay() {
		return this.getProducedPerSecond();
	}

	public setGoldProducedPerDay(amount: number) {
		this.setProducedPerSecond(amount);
	}

	public addGold(amount: number) {
		this.add(amount);
	}

	public removeGold(amount: number) {
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

		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);

		ctx.restore();
	}
}
