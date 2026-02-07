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

		this.name = "Factory";
		this.image = UtilsImage.getImage(image);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
		ctx.restore();
	}
}
