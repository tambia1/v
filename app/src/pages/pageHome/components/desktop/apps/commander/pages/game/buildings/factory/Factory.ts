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
				w: 1,
				h: 1,
			}),

			costGold: 200,
			costIron: 150,
			costOil: 50,
			unitsCanBeProduced: [new Jeep(), new LightTank(), new HeavyTank()],
		});
	}
}
