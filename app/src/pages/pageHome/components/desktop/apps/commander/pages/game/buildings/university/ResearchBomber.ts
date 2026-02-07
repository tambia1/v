import { UtilsImage } from "../../utils/UtilsImage";
import image from "./images/bomber.png";
import { Research } from "./Research";

export class ResearchBomber extends Research {
	constructor() {
		super({
			name: "Bomber",
			timeToResearch: 100,
			image: UtilsImage.getImage(image),
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, 0, 0, 1, 1);
		ctx.restore();
	}
}
