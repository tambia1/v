import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { Missile } from "../weapons/Missile";
import image from "./images/fighter.png";
import { Unit } from "./Unit";

export class Fighter extends Unit {
	constructor() {
		super({
			name: "Fighter",
			image: UtilsImage.getImage(image),
			position: new Position(),

			costGoldToBuild: 100,
			costIronToBuild: 60,
			costOilConsumption: 0,
			life: 75,
			moveSpeed: 30,
			weapons: [new Missile(), new MachineGun()],
			timeToBuild: 25,
		});
	}
}
