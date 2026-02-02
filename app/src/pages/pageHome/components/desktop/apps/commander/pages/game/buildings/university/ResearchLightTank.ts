import { UtilsImage } from "../../core/UtilsImage";
import image from "./images/lightTank.png";
import { Research, ResearchParams } from "./Research";

export class ResearchLightTank extends Research {
	constructor(params: ResearchParams) {
		super(params);
	}

	public override getName() {
		return "Light Tank";
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
