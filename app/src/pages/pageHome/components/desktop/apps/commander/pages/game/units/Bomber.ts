import { UtilsImage } from "../core/UtilsImage";
import { Rpg } from "../weapons/Rpg";
import image from "./images/bomber.png";
import { Unit } from "./Unit";

export class Bomber extends Unit {
	constructor() {
		super({
			costGoldToBuild: 100,
			costIronToBuild: 60,
			costOilConsumption: 0,
			life: 75,
			moveSpeed: 20,
			weapons: [new Rpg()],
			timeToBuild: 25,
		});

		this.name = "Bomber";
		this.image = UtilsImage.getImage(image);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);

		for (let i = 0; i < this.weapons.length; i++) {
			this.weapons[i].draw(ctx);
		}

		ctx.restore();
	}
}
