import { UtilsImage } from "../../core/UtilsImage";
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
			costGold: 1,
			costIron: 1,
			costOil: 1,
			unitsCanBeProduced: [],
			x: params.x,
			y: params.y,
		});

		this.name = "University";

		this.image = UtilsImage.getImage(image);

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

		if (this.isSelected) {
			const centerX = this.getCenterX();
			const centerY = this.getCenterY();

			ctx.translate(centerX, centerY);
			ctx.scale(1.3, 1.3);
			ctx.translate(-centerX, -centerY);
		}

		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);

		ctx.restore();
	}
}
