import { Position } from "../../core/Position";
import { Commando } from "../../units/Commando";
import { Infantry } from "../../units/Infantry";
import { UtilsImage } from "../../utils/UtilsImage";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/barracks.png";

type BarracksParams = {
	x: number;
	y: number;
};

export class Barracks extends ProductionBuilding {
	constructor(params: BarracksParams) {
		super({
			name: "Barracks",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: 1,
				h: 1,
			}),

			costGold: 100,
			costIron: 50,
			costOil: 0,
			unitsCanBeProduced: [new Infantry({ x: 0, y: 0 }), new Commando({ x: 0, y: 0 })],
		});
	}
}
