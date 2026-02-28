import { GRID_SIZE } from "../Constants";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { TankBarrel120 } from "../weapons/TankBarrel120";
import image from "./images/heavyTank.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
};

export class HeavyTank extends Unit {
	constructor(params: Params) {
		super({
			name: "Heavy Tank",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: GRID_SIZE,
				h: GRID_SIZE,
			}),

			costGoldToBuild: 300,
			costIronToBuild: 250,
			costOilConsumption: 80,
			life: 150,
			moveSpeed: 3,
			weapons: [new TankBarrel120(), new MachineGun()],
			timeToBuild: 45,
		});
	}
}
