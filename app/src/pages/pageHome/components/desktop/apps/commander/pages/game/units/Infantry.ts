import { GRID_SIZE } from "../Constants";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { Rifle } from "../weapons/Rifle";
import { Rpg } from "../weapons/Rpg";
import { Stinger } from "../weapons/Stinger";
import image from "./images/infantry.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
};

export class Infantry extends Unit {
	constructor(params: Params) {
		super({
			name: "Infantry",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: GRID_SIZE,
				h: GRID_SIZE,
			}),

			costGold: 50,
			costIron: 30,
			costOil: 0,
			life: 50,
			unitType: "ground",
			moveSpeed: 8,
			weaponsSupported: [new Rifle(), new MachineGun(), new Rpg(), new Stinger()],
			weaponsEquipped: [],
			timeToBuild: 10,
		});
	}

	override clone(params: { x: number; y: number }): Unit {
		return new Infantry({ x: params.x, y: params.y });
	}
}
