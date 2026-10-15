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
	color: string;
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

			costGold: 200,
			costIron: 150,
			costOil: 50,
			color: params.color,
			life: 100,
			unitType: "ground",
			moveSpeed: 5,
			weaponsSupported: [new TankBarrel75({ color: params.color }), new MachineGun({ color: params.color })],
			weaponsEquipped: [],
			timeToBuild: 30,
		});
	}

	override clone(params: { x: number; y: number }): Unit {
		return new LightTank({ x: params.x, y: params.y, color: this.color });
	}
}
