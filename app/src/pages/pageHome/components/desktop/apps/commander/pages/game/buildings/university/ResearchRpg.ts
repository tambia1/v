import { UtilsImage } from "../../utils/UtilsImage";
import image from "./images/rpg.png";
import { Research } from "./Research";

export class ResearchRpg extends Research {
	constructor() {
		super({
			name: "RPG",
			image: UtilsImage.getImage(image),
			timeToResearch: 100,
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, 0, 0, 1, 1);
		ctx.restore();
	}
}
