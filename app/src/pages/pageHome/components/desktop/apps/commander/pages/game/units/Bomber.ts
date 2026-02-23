import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { Bomb } from "../weapons/Bomb";
import image from "./images/bomber.png";
import { Unit } from "./Unit";

export class Bomber extends Unit {
	constructor() {
		super({
			name: "Bomber",
			image: UtilsImage.getImage(image),
			position: new Position(),

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
