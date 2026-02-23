import { Position } from "../../core/Position";
import { Bomber } from "../../units/Bomber";
import { Fighter } from "../../units/Fighter";
import { UtilsImage } from "../../utils/UtilsImage";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/airField.png";

type AirFieldParams = {
	x: number;
	y: number;
};

export class AirField extends ProductionBuilding {
	constructor(params: AirFieldParams) {
		super({
			name: "Air Field",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: 1,
				h: 1,
			}),

			costGold: 250,
			costIron: 150,
			costOil: 50,
			unitsCanBeProduced: [new Fighter({ x: 0, y: 0 }), new Bomber({ x: 0, y: 0 })],
		});

		this.name = "Air Field";
		this.image = UtilsImage.getImage(image);
	}
}
