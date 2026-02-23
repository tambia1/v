import { UtilsImage } from "../utils/UtilsImage";
import image from "./images/machineGun.png";
import { Weapon } from "./Weapon";

export class MachineGun extends Weapon {
	constructor() {
		super({
			costGold: 50,
			costIron: 30,
			damage: 10,
			range: 200,
			rateOfFire: 10,
			accuracy: 0.6,
		});
	}

	public override getName() {
		return "Machine Gun";
	}

	public update(_timeDif: number) {}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
