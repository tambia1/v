import { GRID_SIZE } from "../../Constants";
import { Entity } from "../../core/Entity";
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
				w: GRID_SIZE,
				h: GRID_SIZE,
			}),
			life: 100,
			costGold: 250,
			costIron: 150,
			costOil: 50,
			productionStore: [new Fighter({ x: 0, y: 0 }), new Bomber({ x: 0, y: 0 })],
		});

		this.name = "Air Field";
		this.image = UtilsImage.getImage(image);
	}

	public clone(params: { x: number; y: number }): Entity {
		return new AirField({
			x: params.x,
			y: params.y,
		});
	}
}
