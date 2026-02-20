import { Position } from "../../core/Position";
import { State } from "../../core/State";
import { Animation } from "../../utils/Animation";
import { UtilsImage } from "../../utils/UtilsImage";
import { ProductionBuilding } from "../ProductionBuilding";
import image from "./images/university.png";
import { Research } from "./Research";
import { ResearchBomber } from "./ResearchBomber";
import { ResearchCommando } from "./ResearchCommando";
import { ResearchFighter } from "./ResearchFighter";
import { ResearchHeavyTank } from "./ResearchHeavyTank";
import { ResearchInfantry } from "./ResearchInfantry";
import { ResearchJeep } from "./ResearchJeep";
import { ResearchLightTank } from "./ResearchLightTank";
import { ResearchMachineGun } from "./ResearchMachineGun";
import { ResearchRifle } from "./ResearchRifle";

type UniversityParams = {
	x: number;
	y: number;
};

export class University extends ProductionBuilding {
	public researches: Research[];
	private animationScale: Animation;

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
			state: new State({ isSelected: false, isHovered: false }),

			costGold: 1,
			costIron: 1,
			costOil: 1,
			unitsCanBeProduced: [],
		});

		this.researches = [
			new ResearchRifle(),
			new ResearchMachineGun(),
			new ResearchInfantry(),
			new ResearchCommando(),
			new ResearchJeep(),
			new ResearchLightTank(),
			new ResearchHeavyTank(),
			new ResearchFighter(),
			new ResearchBomber(),
		];

		this.animationScale = new Animation({
			time: 300,
			routes: [
				[1, 1.3],
				[1.3, 1],
			],
			timing: Animation.TIMING_EASE,
			onCalculate: null,
			callbacks: [],
		});

		this.animationScale.resume();
	}

	public removeResearch(research: Research) {
		const index = this.researches.indexOf(research);
		if (index > -1) {
			this.researches.splice(index, 1);
		}
	}

	public setIsSelected(value: boolean) {
		if (this.state.isSelected !== value) {
			this.animationScale.reset();
		}

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

	public update(_timeDif: number) {
		this.animationScale.calculate();
	}

	public override draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.state.isHovered) {
			ctx.beginPath();
			ctx.fillStyle = "#aaffaaff";
			ctx.rect(this.position.x, this.position.y, this.position.w, this.position.h);
			ctx.fill();
			ctx.closePath();
		}

		const centerX = this.position.getCenterX();
		const centerY = this.position.getCenterY();
		const scale = this.state.isSelected ? this.animationScale.results[0] : this.animationScale.results[1];

		ctx.translate(centerX, centerY);
		ctx.scale(scale, scale);
		ctx.translate(-centerX, -centerY);

		ctx.drawImage(this.image, this.position.x, this.position.y, this.position.w, this.position.h);

		ctx.restore();
	}
}
