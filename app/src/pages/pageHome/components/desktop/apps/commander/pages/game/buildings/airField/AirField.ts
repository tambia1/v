import { UtilsImage } from "../../core/UtilsImage";
import { Bomber } from "../../units/Bomber";
import { Fighter } from "../../units/Fighter";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/airField.png";

type AirFieldParams = {
	x: number;
	y: number;
};

export class AirField extends ProductionBuilding {
	constructor(params: AirFieldParams) {
		super({
			costGold: 250,
			costIron: 150,
			costOil: 50,
			unitsCanBeProduced: [new Fighter(), new Bomber()],
			x: params.x,
			y: params.y,
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(UtilsImage.getImage(image), this.position.x, this.position.y, this.position.w, this.position.h);
		ctx.restore();
	}
}
