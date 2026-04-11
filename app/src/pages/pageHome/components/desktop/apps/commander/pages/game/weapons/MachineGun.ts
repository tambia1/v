import { Entity } from "../core/Entity";
import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/machineGun.png";
import { Weapon } from "./Weapon";

export class MachineGun extends Weapon {
	constructor(params: { color: string }) {
		super({
			name: "Machine Gun",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: 0,
				y: 0,
				w: 0,
				h: 0,
			}),
			color: params.color,
			costGold: 20,
			costIron: 10,
			costOil: 0,
			moveSpeed: 0,
			unitType: "ground",
			timeToBuild: 10,
			life: 10,
			damage: 15,
			range: 22,
			rateOfFire: 3,
			accuracy: 0.75,
			rangeColor: "#ffff00",
		});
	}

	public clone(_params: { x: number; y: number }): Entity {
		return new MachineGun({ color: this.color });
	}
}
