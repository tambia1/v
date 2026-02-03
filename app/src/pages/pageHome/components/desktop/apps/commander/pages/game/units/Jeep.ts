import { UtilsImage } from "../core/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import image from "./images/jeep.png";
import { Unit } from "./Unit";

export class Jeep extends Unit {
	constructor() {
		super({
			costGoldToBuild: 80,
			costIronToBuild: 60,
			costOilConsumption: 20,
			life: 60,
			moveSpeed: 12,
			weapons: [new MachineGun()],
			timeToBuild: 20,
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.getPosition().x, this.getPosition().y, this.getPosition().w, this.getPosition().h);

		for (let i = 0; i < this.weapons.length; i++) {
			this.weapons[i].draw(ctx);
		}

		ctx.restore();
	}
}
