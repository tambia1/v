import { UtilsImage } from "../../core/UtilsImage";
import image from "./images/heavyTank.png";
import { Research } from "./Research";

export class ResearchHeavyTank extends Research {
	constructor() {
		super({
			name: "Heavy Tank",
			timeToResearch: 100,
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), 0, 0, 1, 1);
		ctx.restore();
	}
}
