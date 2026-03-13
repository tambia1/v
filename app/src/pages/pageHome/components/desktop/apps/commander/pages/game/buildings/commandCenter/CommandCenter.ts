import { GRID_SIZE } from "../../Constants";
import { Entity } from "../../core/Entity";
import { Position } from "../../core/Position";
import { UtilsImage } from "../../utils/UtilsImage";
import { AirField } from "../airField/AirField";
import { Barracks } from "../barracks/Barracks";
import { Factory } from "../factory/Factory";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/commandCenter.png";

type CommandCenterParams = {
	x: number;
	y: number;
	color: string;
};

export class CommandCenter extends ProductionBuilding {
	constructor(params: CommandCenterParams) {
		super({
			name: "Command Center",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: GRID_SIZE,
				h: GRID_SIZE,
			}),
			life: 100,
			color: params.color,
			costGold: 1,
			costIron: 1,
			costOil: 1,
			timeToBuild: 10,
			productionStore: [
				new Barracks({ x: 0, y: 0, color: params.color }),
				new Factory({ x: 0, y: 0, color: params.color }),
				new AirField({ x: 0, y: 0, color: params.color }),
			],
		});
	}

	public clone(params: { x: number; y: number }): Entity {
		return new CommandCenter({
			x: params.x,
			y: params.y,
			color: this.color,
		});
	}
}
