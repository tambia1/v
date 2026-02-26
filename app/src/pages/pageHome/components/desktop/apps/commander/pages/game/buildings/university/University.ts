import { Position } from "../../core/Position";
import { UtilsImage } from "../../utils/UtilsImage";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/university.png";
import { Research } from "./Research";
import { ResearchBomber } from "./ResearchBomber";
import { ResearchCommando } from "./ResearchCommando";
import { ResearchFighter } from "./ResearchFighter";
import { ResearchHeavyTank } from "./ResearchHeavyTank";
import { ResearchInfantry } from "./ResearchInfantry";
import { ResearchJeep } from "./ResearchJeep";
import { ResearchLightTank } from "./ResearchLightTank";
import { ResearchMachineGun } from "./ResearchMachineGun";
import { ResearchMissle } from "./ResearchMissile";
import { ResearchRifle } from "./ResearchRifle";
import { ResearchRpg } from "./ResearchRpg";

type UniversityParams = {
	x: number;
	y: number;
};

export class University extends ProductionBuilding {
	public researches: Research[];

	constructor(params: UniversityParams) {
		super({
			name: "University",
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
			unitsThatCanBeProduced: [],
		});

		this.researches = [
			new ResearchRifle(),
			new ResearchMachineGun(),
			new ResearchRpg(),
			new ResearchMissle(),
			new ResearchInfantry(),
			new ResearchCommando(),
			new ResearchJeep(),
			new ResearchLightTank(),
			new ResearchHeavyTank(),
			new ResearchFighter(),
			new ResearchBomber(),
		];
	}

	public removeResearch(research: Research) {
		const index = this.researches.indexOf(research);
		if (index > -1) {
			this.researches.splice(index, 1);
		}
	}
}
