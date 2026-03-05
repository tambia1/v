import { Entity } from "../core/Entity";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/tankBarrel120.png";
import { Weapon } from "./Weapon";

export class TankBarrel120 extends Weapon {
	constructor() {
		super({
			name: "Tank Barrel 120mm",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: 0,
				y: 0,
				w: 0,
				h: 0,
			}),
			costGoldToBuild: 20,
			costIronToBuild: 10,
			costOilConsumption: 0,
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
		return new TankBarrel120();
	}
}
