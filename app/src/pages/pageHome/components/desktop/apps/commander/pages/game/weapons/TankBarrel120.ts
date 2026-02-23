import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/tankBarrel120.png";
import { Weapon } from "./Weapon";

export class TankBarrel120 extends Weapon {
	constructor() {
		super({
			costGold: 200,
			costIron: 150,
			damage: 120,
			range: 600,
			rateOfFire: 1.5,
			accuracy: 0.85,
		});
	}

	public override getName() {
		return "Tank Barrel 120";
	}

	public update(_timeDif: number) {}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
