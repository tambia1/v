import { UtilsImage } from "../core/UtilsImage";
import { Rifle } from "../weapons/Rifle";
import { Rpg } from "../weapons/Rpg";
import image from "./images/commando.png";
import { Unit } from "./Unit";

export class Commando extends Unit {
	constructor() {
		super({
			costGoldToBuild: 100,
			costIronToBuild: 60,
			costOilConsumption: 0,
			life: 75,
			moveSpeed: 7,
			weapons: [new Rifle(), new Rpg()],
			timeToBuild: 15,
		});

		this.name = "Commando";
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
