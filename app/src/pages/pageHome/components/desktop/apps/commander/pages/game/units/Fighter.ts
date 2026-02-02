import { UtilsImage } from "../core/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import image from "./images/fighter.png";
import { Unit } from "./Unit";

export class Fighter extends Unit {
	constructor() {
		super({
			costGoldToBuild: 100,
			costIronToBuild: 60,
			costOilConsumption: 0,
			life: 75,
			moveSpeed: 30,
			weapons: [new MachineGun()],
			timeToBuild: 25,
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);

		for (let i = 0; i < this.weapons.length; i++) {
			this.weapons[i].draw(ctx);
		}

		ctx.restore();
	}
}
