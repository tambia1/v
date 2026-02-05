import { UtilsImage } from "../core/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { Rifle } from "../weapons/Rifle";
import image from "./images/infantry.png";
import { Unit } from "./Unit";

export class Infantry extends Unit {
	private image: HTMLImageElement;

	constructor() {
		super({
			costGoldToBuild: 50,
			costIronToBuild: 30,
			costOilConsumption: 0,
			life: 50,
			moveSpeed: 8,
			weapons: [new Rifle(), new MachineGun()],
			timeToBuild: 10,
		});

		this.image = UtilsImage.getImage(image);
	}

	public getImage() {
		return this.image;
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.getPosition().x, this.getPosition().y, this.getPosition().w, this.getPosition().h);

		for (let i = 0; i < this.weapons.length; i++) {
			this.weapons[i].draw(ctx);
		}

		ctx.restore();
	}
}
