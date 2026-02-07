import { UtilsImage } from "../../utils/UtilsImage";
import image from "./images/rifle.png";
import { Research } from "./Research";

export class ResearchRifle extends Research {
	constructor() {
		super({
			name: "Rifle",
			timeToResearch: 100,
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), 0, 0, 1, 1);
		ctx.restore();
	}
}
