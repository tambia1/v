import { UtilsImage } from "../../core/UtilsImage";
import image from "./images/machineGun.png";
import { Research, ResearchParams } from "./Research";

export class ResearchMachineGun extends Research {
	constructor(params: ResearchParams) {
		super(params);
	}

	public override getName() {
		return "Machine Gun";
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
