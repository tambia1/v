import { Position } from "../../core/Position";
import { UtilsImage } from "../../utils/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/ironMine.png";

type IronMineParams = {
	x: number;
	y: number;
};

export class IronMine extends ResourceBuilding {
	constructor(params: IronMineParams) {
		super({
			name: "Iron Mine",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: 1,
				h: 1,
			}),

			amount: 0,
			producedPerSecond: 1,
		});
	}
}
