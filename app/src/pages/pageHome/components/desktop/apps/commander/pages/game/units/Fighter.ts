import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { Missile } from "../weapons/Missile";
import image from "./images/fighter.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
};

export class Fighter extends Unit {
	constructor(params: Params) {
		super({
			name: "Fighter",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: 1,
				h: 1,
			}),

			costGoldToBuild: 100,
			costIronToBuild: 60,
			costOilConsumption: 0,
			life: 75,
			moveSpeed: 30,
			weapons: [new Missile(), new MachineGun()],
			timeToBuild: 25,
		});
	}
}
