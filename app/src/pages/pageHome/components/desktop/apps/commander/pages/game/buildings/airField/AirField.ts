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

		this.name = "Air Field";
		this.image = UtilsImage.getImage(image);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
