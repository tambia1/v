import { UtilsImage } from "../../core/UtilsImage";
import image from "./images/bomber.png";
import { Research } from "./Research";

export class ResearchBomber extends Research {
	constructor() {
		super({
			name: "Bomber",
			timeToResearch: 100,
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), 0, 0, 1, 1);
		ctx.restore();
	}
}
