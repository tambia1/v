import { GRID_SIZE } from "../Constants";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { Rpg } from "../weapons/Rpg";
import { Stinger } from "../weapons/Stinger";
import image from "./images/jeep.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
	color: string;
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

			costGold: 80,
			costIron: 60,
			costOil: 20,
			color: params.color,
			life: 60,
			unitType: "ground",
			moveSpeed: 12,
			weaponsSupported: [new MachineGun({ color: params.color }), new Rpg({ color: params.color }), new Stinger({ color: params.color })],
			weaponsEquipped: [],
			timeToBuild: 20,
		});
	}

	override clone(params: { x: number; y: number }): Unit {
		return new Jeep({ x: params.x, y: params.y, color: this.color });
	}
}
