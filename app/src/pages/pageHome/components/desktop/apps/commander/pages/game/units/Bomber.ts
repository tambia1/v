import { GRID_SIZE } from "../Constants";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { Bomb } from "../weapons/Bomb";
import image from "./images/bomber.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
	color: string;
};

export class Bomber extends Unit {
	constructor(params: Params) {
		super({
			name: "Bomber",
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
			unitType: "air",
			moveSpeed: 20,
			weaponsSupported: [new Bomb({ color: params.color })],
			weaponsEquipped: [],
			timeToBuild: 25,
		});
	}

	override clone(params: { x: number; y: number }): Unit {
		return new Bomber({ x: params.x, y: params.y, color: this.color });
	}
}
