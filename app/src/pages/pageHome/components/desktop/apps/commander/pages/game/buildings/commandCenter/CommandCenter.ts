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
			costGold: 1,
			costIron: 1,
			costOil: 1,
			productionStore: [],
		});

		this.productionStore = [new Barracks({ x: 0, y: 0 }), new Factory({ x: 0, y: 0 }), new AirField({ x: 0, y: 0 })];
	}

	public clone(params: { x: number; y: number }): Entity {
		return new CommandCenter({
			x: params.x,
			y: params.y,
		});
	}
}
