import { UtilsImage } from "../../core/UtilsImage";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/university.png";
import { Research } from "./Research";

export class University extends ProductionBuilding {
	private researches: Research[];

	constructor() {
		super({
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
		ctx.drawImage(UtilsImage.getImage(image), this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
