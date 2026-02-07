import { Position } from "../core/Position";
import { State } from "../core/State";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { Rifle } from "../weapons/Rifle";
import image from "./images/infantry.png";
import { Unit } from "./Unit";

export class Infantry extends Unit {
	constructor() {
		super({
			name: "Infantry",
			image: UtilsImage.getImage(image),
			position: new Position(),
			state: new State({ isSelected: false }),

			costGoldToBuild: 50,
			costIronToBuild: 30,
			costOilConsumption: 0,
			life: 50,
			moveSpeed: 8,
			weapons: [new Rifle(), new MachineGun()],
			timeToBuild: 10,
		});
	}

	public update(_timeDif: number) {
		// TODO: update infantry
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
