import { Position } from "../core/Position";
import { State } from "../core/State";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { TankBarrel120 } from "../weapons/TankBarrel120";
import image from "./images/heavyTank.png";
import { Unit } from "./Unit";

export class HeavyTank extends Unit {
	constructor() {
		super({
			name: "Heavy Tank",
			image: UtilsImage.getImage(image),
			position: new Position(),
			state: new State({ isSelected: false }),

			costGoldToBuild: 300,
			costIronToBuild: 250,
			costOilConsumption: 80,
			life: 150,
			moveSpeed: 3,
			weapons: [new TankBarrel120(), new MachineGun()],
			timeToBuild: 45,
		});
	}

	public update(_timeDif: number) {
		// TODO: update heavy tank
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
