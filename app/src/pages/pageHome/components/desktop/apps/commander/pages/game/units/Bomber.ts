import { UtilsImage } from "../core/UtilsImage";
import { Rpg } from "../weapons/Rpg";
import image from "./images/bomber.png";
import { Unit } from "./Unit";

export class Bomber extends Unit {
	private image: HTMLImageElement;

	constructor() {
		super({
			costGoldToBuild: 100,
			costIronToBuild: 60,
			costOilConsumption: 0,
			life: 75,
			moveSpeed: 20,
			weapons: [new Rpg()],
			timeToBuild: 25,
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
