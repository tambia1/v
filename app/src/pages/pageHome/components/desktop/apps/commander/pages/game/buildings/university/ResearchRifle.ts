import { UtilsImage } from "../../core/UtilsImage";
import image from "./images/rifle.png";
import { Research, ResearchParams } from "./Research";

export class ResearchRifle extends Research {
	constructor(params: ResearchParams) {
		super(params);
	}

	public override getName() {
		return "Rifle";
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
