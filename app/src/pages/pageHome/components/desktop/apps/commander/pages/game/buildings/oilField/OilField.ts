import { Position } from "../../core/Position";
import { State } from "../../core/State";
import { UtilsImage } from "../../utils/UtilsImage";
import { ResourceBuilding } from "../ResourceBuilding";
import image from "./images/oilField.png";

type OilFieldParams = {
	x: number;
	y: number;
};

export class OilField extends ResourceBuilding {
	constructor(params: OilFieldParams) {
		super({
			name: "Oil Field",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: 1,
				h: 1,
			}),
			state: new State({ isSelected: false, isHovered: false }),

			amount: 0,
			producedPerSecond: 1,
		});
	}
}
