import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/tankBarrel120.png";
import { Weapon } from "./Weapon";

export class TankBarrel120 extends Weapon {
	constructor() {
		super({
			name: "Tank Barrel 120",
			image: UtilsImage.getImage(image),
			costGold: 200,
			costIron: 150,
			damage: 120,
			range: 600,
			rateOfFire: 1.5,
			accuracy: 0.85,
		});
	}

	public update(_timeDif: number) {}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
