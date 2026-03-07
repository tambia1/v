import { Entity } from "../core/Entity";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/missile.png";
import { Weapon } from "./Weapon";

export class Missile extends Weapon {
	constructor() {
		super({
			name: "Missile",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: 0,
				y: 0,
				w: 0,
				h: 0,
			}),
			costGold: 20,
			costIron: 10,
			costOil: 0,
			moveSpeed: 0,
			timeToBuild: 10,
			life: 10,
			damage: 15,
			range: 250,
			rateOfFire: 3,
			accuracy: 0.75,
		});
	}

	public clone(_params: { x: number; y: number }): Entity {
		return new Missile();
	}
}
