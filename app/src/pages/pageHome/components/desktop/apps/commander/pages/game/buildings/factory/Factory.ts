import { GRID_SIZE } from "../../Constants";
import { Entity } from "../../core/Entity";
import { Position } from "../../core/Position";
import { HeavyTank } from "../../units/HeavyTank";
import { Jeep } from "../../units/Jeep";
import { LightTank } from "../../units/LightTank";
import { UtilsImage } from "../../utils/UtilsImage";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/factory.png";

type FactoryParams = {
	x: number;
	y: number;
};

export class Factory extends ProductionBuilding {
	constructor(params: FactoryParams) {
		super({
			name: "Factory",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: GRID_SIZE,
				h: GRID_SIZE,
			}),
			life: 100,
			costGold: 200,
			costIron: 150,
			costOil: 50,
			productionStore: [new Jeep({ x: 0, y: 0 }), new LightTank({ x: 0, y: 0 }), new HeavyTank({ x: 0, y: 0 })],
		});
	}

	public clone(params: { x: number; y: number }): Entity {
		return new Factory({
			x: params.x,
			y: params.y,
		});
	}
}
