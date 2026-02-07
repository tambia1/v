import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/rpg.png";
import { Weapon } from "./Weapon";

export class Rpg extends Weapon {
	constructor() {
		super({
			costGold: 80,
			costIron: 40,
			damage: 70,
			range: 350,
			rateOfFire: 1,
			accuracy: 0.7,
		});
	}

	public override getName() {
		return "RPG";
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
