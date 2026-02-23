import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { Bomb } from "../weapons/Bomb";
import image from "./images/bomber.png";
import { Unit } from "./Unit";

type Params = {
	x: number;
	y: number;
};

export class Bomber extends Unit {
	constructor(params: Params) {
		super({
			name: "Bomber",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: 1,
				h: 1,
			}),

			costGoldToBuild: 100,
			costIronToBuild: 60,
			costOilConsumption: 0,
			life: 75,
			moveSpeed: 20,
			weapons: [new Bomb()],
			timeToBuild: 25,
		});
	}
}
