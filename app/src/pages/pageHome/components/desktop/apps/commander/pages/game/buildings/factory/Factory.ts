import { UtilsImage } from "../../core/UtilsImage";
import { HeavyTank } from "../../units/HeavyTank";
import { Jeep } from "../../units/Jeep";
import { LightTank } from "../../units/LightTank";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/factory.png";

type FactoryParams = {
	x: number;
	y: number;
};

export class Factory extends ProductionBuilding {
	constructor(params: FactoryParams) {
		super({
			costGold: 200,
			costIron: 150,
			costOil: 50,
			unitsCanBeProduced: [new Jeep(), new LightTank(), new HeavyTank()],
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
