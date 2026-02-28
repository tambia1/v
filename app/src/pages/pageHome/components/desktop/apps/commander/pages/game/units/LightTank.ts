import { GRID_SIZE } from "../Constants";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { TankBarrel75 } from "../weapons/TankBarrel75";
import image from "./images/lightTank.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
};

export class LightTank extends Unit {
	constructor(params: Params) {
		super({
			name: "Light Tank",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: GRID_SIZE,
				h: GRID_SIZE,
			}),

			costGoldToBuild: 200,
			costIronToBuild: 150,
			costOilConsumption: 50,
			life: 100,
			moveSpeed: 5,
			weapons: [new TankBarrel75(), new MachineGun()],
			timeToBuild: 30,
		});
	}

	override clone(params: { x: number; y: number }): Unit {
		return new LightTank({ x: params.x, y: params.y });
	}
}
