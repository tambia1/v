import { UtilsImage } from "../../core/UtilsImage";
import image from "./images/heavyTank.png";
import { Research, ResearchParams } from "./Research";

export class ResearchHeavyTank extends Research {
	constructor(params: ResearchParams) {
		super(params);
	}

	public override getName() {
		return "Heavy Tank";
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
