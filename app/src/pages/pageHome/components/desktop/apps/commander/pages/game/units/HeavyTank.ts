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
				w: 1,
				h: 1,
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
