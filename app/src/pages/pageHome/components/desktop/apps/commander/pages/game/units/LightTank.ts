import { Position } from "../core/Position";
import { State } from "../core/State";
import { UtilsImage } from "../utils/UtilsImage";
import { MachineGun } from "../weapons/MachineGun";
import { TankBarrel75 } from "../weapons/TankBarrel75";
import image from "./images/lightTank.png";
import { Unit } from "./Unit";

export class LightTank extends Unit {
	constructor() {
		super({
			name: "Light Tank",
			image: UtilsImage.getImage(image),
			position: new Position(),
			state: new State({ isSelected: false, isHovered: false }),

			costGoldToBuild: 200,
			costIronToBuild: 150,
			costOilConsumption: 50,
			life: 100,
			moveSpeed: 5,
			weapons: [new TankBarrel75(), new MachineGun()],
			timeToBuild: 30,
		});
	}

	public setIsSelected(value: boolean) {
		this.state.isSelected = value;
	}

	public getIsSelected() {
		return this.state.isSelected;
	}

	public setIsHovered(value: boolean) {
		this.state.isHovered = value;
	}

	public getIsHovered() {
		return this.state.isHovered;
	}

	public update(_timeDif: number) {}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);

		for (let i = 0; i < this.weapons.length; i++) {
			this.weapons[i].draw(ctx);
		}

		ctx.restore();
	}
}
