import { UtilsImage } from "../../core/UtilsImage";
import { Position } from "../../map/Position";
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

	public getPosition(): Position {
		return this.position;
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.position.getIsSelected()) {
			const centerX = this.position.getCenterX();
			const centerY = this.position.getCenterY();

			ctx.translate(centerX, centerY);
			ctx.scale(1.3, 1.3);
			ctx.translate(-centerX, -centerY);
		}

		ctx.drawImage(UtilsImage.getImage(image), this.position.x, this.position.y, this.position.w, this.position.h);

		ctx.restore();
	}
}
