import { UtilsImage } from "../../core/UtilsImage";
import { Bomber } from "../../units/Bomber";
import { Fighter } from "../../units/Fighter";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/airField.png";

export class AirField extends ProductionBuilding {
	constructor() {
		super({
			costGold: 250,
			costIron: 150,
			costOil: 50,
			unitsCanBeProduced: [new Fighter(), new Bomber()],
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
