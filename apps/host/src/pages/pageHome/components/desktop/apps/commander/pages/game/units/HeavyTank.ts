import { GRID_SIZE } from "../Constants";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { TankBarrel75 } from "../weapons/TankBarrel75";
import { TankBarrel120 } from "../weapons/TankBarrel120";
import image from "./images/heavyTank.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
	color: string;
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

			costGold: 300,
			costIron: 250,
			costOil: 80,
			color: params.color,
			life: 150,
			unitType: "ground",
			moveSpeed: 3,
			weaponsSupported: [new TankBarrel75({ color: params.color }), new TankBarrel120({ color: params.color }), new MachineGun({ color: params.color })],
			weaponsEquipped: [],
			timeToBuild: 45,
		});
	}

	override clone(params: { x: number; y: number }): Unit {
		return new HeavyTank({ x: params.x, y: params.y, color: this.color });
	}
}
