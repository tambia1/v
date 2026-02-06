import { UtilsImage } from "../../core/UtilsImage";
import { Commando } from "../../units/Commando";
import { Infantry } from "../../units/Infantry";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/barracks.png";

type BarracksParams = {
	x: number;
	y: number;
};

export class Barracks extends ProductionBuilding {
	constructor(params: BarracksParams) {
		super({
			costGold: 100,
			costIron: 50,
			costOil: 0,
			unitsCanBeProduced: [new Infantry(), new Commando()],
			x: params.x,
			y: params.y,
		});

		this.name = "Barracks";
		this.image = UtilsImage.getImage(image);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);
		ctx.restore();
	}
}
