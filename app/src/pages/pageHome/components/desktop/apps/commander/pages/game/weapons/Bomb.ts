import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/bomb.png";
import { Weapon } from "./Weapon";

export class Bomb extends Weapon {
	constructor() {
		super({
			name: "Bomb",
			image: UtilsImage.getImage(image),
			costGold: 50,
			costIron: 10,
			damage: 50,
			range: 500,
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
