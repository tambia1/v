import { GRID_SIZE } from "../Constants";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { Rifle } from "../weapons/Rifle";
import { Rpg } from "../weapons/Rpg";
import image from "./images/commando.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
	color: string;
};

export class Commando extends Unit {
	constructor(params: Params) {
		super({
			name: "Commando",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: GRID_SIZE,
				h: GRID_SIZE,
			}),

			costGold: 100,
			costIron: 60,
			costOil: 0,
			color: params.color,
			life: 75,
			unitType: "ground",
			moveSpeed: 7,
			weaponsSupported: [new Rifle({ color: params.color }), new MachineGun({ color: params.color }), new Rpg({ color: params.color })],
			weaponsEquipped: [],
			timeToBuild: 15,
		});
	}

	override clone(params: { x: number; y: number }): Unit {
		return new Commando({ x: params.x, y: params.y, color: this.color });
	}
}
