import { UtilsImage } from "../core/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { TankBarrel120 } from "../weapons/TankBarrel120";
import image from "./images/heavyTank.png";
import { Unit } from "./Unit";

export class HeavyTank extends Unit {
	constructor() {
		super({
			costGoldToBuild: 300,
			costIronToBuild: 250,
			costOilConsumption: 80,
			life: 150,
			moveSpeed: 3,
			weapons: [new TankBarrel120(), new MachineGun()],
			timeToBuild: 45,
		});

		this.name = "Heavy Tank";
		this.image = UtilsImage.getImage(image);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);

		for (let i = 0; i < this.weapons.length; i++) {
			this.weapons[i].draw(ctx);
		}

		ctx.restore();
	}
}
