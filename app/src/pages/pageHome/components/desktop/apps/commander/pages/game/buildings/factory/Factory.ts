import { Position } from "../../core/Position";
import { State } from "../../core/State";
import { HeavyTank } from "../../units/HeavyTank";
import { Jeep } from "../../units/Jeep";
import { LightTank } from "../../units/LightTank";
import { UtilsImage } from "../../utils/UtilsImage";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/factory.png";

type FactoryParams = {
	x: number;
	y: number;
};

export class Factory extends ProductionBuilding {
	constructor(params: FactoryParams) {
		super({
			name: "Factory",
			image: UtilsImage.getImage(image),
			position: new Position({
				x: params.x,
				y: params.y,
				w: 1,
				h: 1,
			}),
			state: new State({ isSelected: false, isHovered: false }),

			costGold: 200,
			costIron: 150,
			costOil: 50,
			unitsCanBeProduced: [new Jeep(), new LightTank(), new HeavyTank()],
		});
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.state.isHovered) {
			ctx.beginPath();
			ctx.fillStyle = "#aaffaaaa";
			ctx.rect(this.position.x, this.position.y, this.position.w, this.position.h);
			ctx.fill();
			ctx.closePath();
		}

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
