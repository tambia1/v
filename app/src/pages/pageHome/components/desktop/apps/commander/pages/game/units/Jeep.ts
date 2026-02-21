import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import image from "./images/jeep.png";
import { Unit } from "./Unit";

export class Jeep extends Unit {
	constructor() {
		super({
			name: "Jeep",
			image: UtilsImage.getImage(image),
			position: new Position(),

			costGoldToBuild: 80,
			costIronToBuild: 60,
			costOilConsumption: 20,
			life: 60,
			moveSpeed: 12,
			weapons: [new MachineGun()],
			timeToBuild: 20,
		});
	}

	public update(_timeDif: number) {
		// TODO: update jeep
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
