import { GRID_SIZE } from "../Constants";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import image from "./images/jeep.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
};

export class Jeep extends Unit {
	constructor(params: Params) {
		super({
			name: "Jeep",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: GRID_SIZE,
				h: GRID_SIZE,
			}),

			costGoldToBuild: 80,
			costIronToBuild: 60,
			costOilConsumption: 20,
			life: 60,
			moveSpeed: 12,
			weapons: [new MachineGun()],
			timeToBuild: 20,
		});
	}
}
