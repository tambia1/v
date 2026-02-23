import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/tankBarrel75.png";
import { Weapon } from "./Weapon";

export class TankBarrel75 extends Weapon {
	constructor() {
		super({
			costGold: 150,
			costIron: 100,
			damage: 75,
			range: 500,
			rateOfFire: 2,
			accuracy: 0.8,
		});
	}

	public override getName() {
		return "Tank Barrel 75";
	}

	public update(_timeDif: number) {}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
