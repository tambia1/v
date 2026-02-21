import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import image from "./images/fighter.png";
import { Unit } from "./Unit";

export class Fighter extends Unit {
	constructor() {
		super({
			name: "Fighter",
			image: UtilsImage.getImage(image),
			position: new Position(),

			costGoldToBuild: 100,
			costIronToBuild: 60,
			costOilConsumption: 0,
			life: 75,
			moveSpeed: 30,
			weapons: [new MachineGun()],
			timeToBuild: 25,
		});
	}

	public update(_timeDif: number) {
		// TODO: update fighter
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
