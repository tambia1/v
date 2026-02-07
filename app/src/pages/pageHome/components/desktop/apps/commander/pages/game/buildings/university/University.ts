import { Position } from "../../core/Position";
import { State } from "../../core/State";
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
import { ResearchRifle } from "./ResearchRifle";

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
			state: new State({ isSelected: false }),

			costGold: 1,
			costIron: 1,
			costOil: 1,
			unitsCanBeProduced: [],
		});

		this.researches = [
			new ResearchInfantry(),
			new ResearchRifle(),
			new ResearchMachineGun(),
			new ResearchJeep(),
			new ResearchLightTank(),
			new ResearchHeavyTank(),
			new ResearchCommando(),
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

	public update(_timeDif: number) {
		// TODO: update researches
	}

	public override draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.state.isSelected) {
			const centerX = this.position.getCenterX();
			const centerY = this.position.getCenterY();

			ctx.translate(centerX, centerY);
			ctx.scale(1.3, 1.3);
			ctx.translate(-centerX, -centerY);
		}

		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);

		ctx.restore();
	}
}
