import { Position } from "../core/Position";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { TankBarrel75 } from "../weapons/TankBarrel75";
import image from "./images/lightTank.png";
import { Unit } from "./Unit";

export class LightTank extends Unit {
	constructor() {
		super({
			name: "Light Tank",
			image: UtilsImage.getImage(image),
			position: new Position(),

			costGoldToBuild: 200,
			costIronToBuild: 150,
			costOilConsumption: 50,
			life: 100,
			moveSpeed: 5,
			weapons: [new TankBarrel75(), new MachineGun()],
			timeToBuild: 30,
		});
	}
}
