import { UtilsImage } from "../core/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { TankBarrel75 } from "../weapons/TankBarrel75";
import image from "./images/lightTank.png";
import { Unit } from "./Unit";

export class LightTank extends Unit {
	constructor() {
		super({
			costGoldToBuild: 200,
			costIronToBuild: 150,
			costOilConsumption: 50,
			life: 100,
			moveSpeed: 5,
			weapons: [new TankBarrel75(), new MachineGun()],
			timeToBuild: 30,
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
