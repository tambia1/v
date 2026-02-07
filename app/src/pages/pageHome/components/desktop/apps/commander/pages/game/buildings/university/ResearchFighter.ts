import { UtilsImage } from "../../utils/UtilsImage";
import image from "./images/fighter.png";
import { Research } from "./Research";

export class ResearchFighter extends Research {
	constructor() {
		super({
			name: "Fighter",
			timeToResearch: 100,
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), 0, 0, 1, 1);
		ctx.restore();
	}
}
