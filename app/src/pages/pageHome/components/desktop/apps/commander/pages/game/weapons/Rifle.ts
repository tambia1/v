import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/rifle.png";
import { Weapon } from "./Weapon";

export class Rifle extends Weapon {
	constructor() {
		super({
			name: "Rifle",
			image: UtilsImage.getImage(image),
			costGold: 20,
			costIron: 10,
			damage: 15,
			range: 250,
			rateOfFire: 3,
			accuracy: 0.75,
		});
	}

	public update(_timeDif: number) {}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
