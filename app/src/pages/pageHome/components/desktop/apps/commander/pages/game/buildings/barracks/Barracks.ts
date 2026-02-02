import { UtilsImage } from "../../core/UtilsImage";
import { Commando } from "../../units/Commando";
import { Infantry } from "../../units/Infantry";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/barracks.png";

export class Barracks extends ProductionBuilding {
	constructor() {
		super({
			costGold: 100,
			costIron: 50,
			costOil: 0,
			unitsCanBeProduced: [new Infantry(), new Commando()],
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
