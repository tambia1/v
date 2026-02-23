import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { Rifle } from "../weapons/Rifle";
import { Rpg } from "../weapons/Rpg";
import image from "./images/commando.png";
import { Unit } from "./Unit";

export class Commando extends Unit {
	constructor() {
		super({
			name: "Commando",
			image: UtilsImage.getImage(image),
			position: new Position(),

			costGoldToBuild: 100,
			costIronToBuild: 60,
			costOilConsumption: 0,
			life: 75,
			moveSpeed: 7,
			weapons: [new Rifle(), new MachineGun(), new Rpg()],
			timeToBuild: 15,
		});
	}
}
