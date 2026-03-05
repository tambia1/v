import { GRID_SIZE } from "../../Constants";
import { Entity } from "../../core/Entity";
import { Position } from "../../core/Position";
import { Bomber } from "../../units/Bomber";
import { Commando } from "../../units/Commando";
import { Fighter } from "../../units/Fighter";
import { HeavyTank } from "../../units/HeavyTank";
import { Infantry } from "../../units/Infantry";
import { Jeep } from "../../units/Jeep";
import { LightTank } from "../../units/LightTank";
import { UtilsImage } from "../../utils/UtilsImage";
import { MachineGun } from "../../weapons/MachineGun";
import { Missile } from "../../weapons/Missile";
import { Rifle } from "../../weapons/Rifle";
import { Rpg } from "../../weapons/Rpg";
import { TankBarrel75 } from "../../weapons/TankBarrel75";
import { TankBarrel120 } from "../../weapons/TankBarrel120";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/university.png";

type UniversityParams = {
	x: number;
	y: number;
};

export class University extends ProductionBuilding {
	constructor(params: UniversityParams) {
		super({
			name: "University",
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
			productionStore: [
				new Rifle(),
				new MachineGun(),
				new Rpg(),
				new Missile(),
				new TankBarrel75(),
				new TankBarrel120(),
				new Infantry({ x: 0, y: 0 }),
				new Commando({ x: 0, y: 0 }),
				new Jeep({ x: 0, y: 0 }),
				new LightTank({ x: 0, y: 0 }),
				new HeavyTank({ x: 0, y: 0 }),
				new Fighter({ x: 0, y: 0 }),
				new Bomber({ x: 0, y: 0 }),
			],
		});
	}

	public clone(params: { x: number; y: number }): Entity {
		return new University({
			x: params.x,
			y: params.y,
		});
	}
}
