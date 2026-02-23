import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/missile.png";
import { Weapon } from "./Weapon";

export class Missile extends Weapon {
	constructor() {
		super({
			name: "Missile",
			image: UtilsImage.getImage(image),
			costGold: 30,
			costIron: 10,
			damage: 20,
			range: 400,
			rateOfFire: 1,
			accuracy: 1.0,
		});
	}

	public update(_timeDif: number) {}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
