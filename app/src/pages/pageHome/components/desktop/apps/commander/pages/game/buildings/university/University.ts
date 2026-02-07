import { Position } from "../../core/Position";
import { State } from "../../core/State";
import { UtilsImage } from "../../utils/UtilsImage";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/university.png";
import { Research } from "./Research";

type UniversityParams = {
	x: number;
	y: number;
};

export class University extends ProductionBuilding {
	private researches: Research[];

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

		this.researches = [];
	}

	public getResearches() {
		return this.researches;
	}

	public addResearch(research: Research) {
		this.researches.push(research);
	}

	public removeResearch(research: Research) {
		const index = this.researches.indexOf(research);
		if (index > -1) {
			this.researches.splice(index, 1);
		}
	}

	public draw(ctx: CanvasRenderingContext2D) {
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
