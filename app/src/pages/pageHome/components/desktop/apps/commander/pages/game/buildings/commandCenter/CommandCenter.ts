import { Position } from "../../core/Position";
import { UtilsImage } from "../../utils/UtilsImage";
import { AirField } from "../airField/AirField";
import { Building } from "../Building";
import { Barracks } from "../barracks/Barracks";
import { Factory } from "../factory/Factory";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/commandCenter.png";

type CommandCenterParams = {
	x: number;
	y: number;
};

export class CommandCenter extends ProductionBuilding {
	public buildings: Building[];

	constructor(params: CommandCenterParams) {
		super({
			name: "Command Center",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: 1,
				h: 1,
			}),

			costGold: 1,
			costIron: 1,
			costOil: 1,
			unitsCanBeProduced: [],
		});

		this.buildings = [new Barracks({ x: 0, y: 0 }), new Factory({ x: 0, y: 0 }), new AirField({ x: 0, y: 0 })];
	}
}
