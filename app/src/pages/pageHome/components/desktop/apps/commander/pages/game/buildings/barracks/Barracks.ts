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
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.translate(this.getPosition().x + this.getPosition().w, this.getPosition().y + this.getPosition().h);

		ctx.drawImage(UtilsImage.getImage(image), this.getPosition().x, this.getPosition().y, this.getPosition().w, this.getPosition().h);
		ctx.restore();
	}
}
