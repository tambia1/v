import { UtilsImage } from "../core/UtilsImage";
import { Position } from "../map/Position";
import { Weapon } from "../weapons/Weapon";

type UnitParams = {
	costGoldToBuild: number;
	costIronToBuild: number;
	costOilConsumption: number;
	life: number;
	moveSpeed: number;
	weapons: Weapon[];
	timeToBuild: number;
};

export abstract class Unit {
	protected costGoldToBuild: number;
	protected costIronToBuild: number;
	protected costOilConsumption: number;
	protected life: number;
	protected moveSpeed: number;
	protected weapons: Weapon[];
	protected timeToBuild: number;
	protected buildProgress: number;
	protected position: Position;

	public name: string;
	public image: HTMLImageElement;

	constructor(params: UnitParams) {
		this.costGoldToBuild = params.costGoldToBuild;
		this.costIronToBuild = params.costIronToBuild;
		this.costOilConsumption = params.costOilConsumption;
		this.life = params.life;
		this.moveSpeed = params.moveSpeed;
		this.weapons = params.weapons;
		this.timeToBuild = params.timeToBuild;
		this.buildProgress = 0;
		this.position = new Position();

		this.name = "";
		this.image = UtilsImage.getImage("");
	}

	public getCostGoldToBuild() {
		return this.costGoldToBuild;
	}

	public setCostGoldToBuild(cost: number) {
		this.costGoldToBuild = cost;
	}

	public getCostIronToBuild() {
		return this.costIronToBuild;
	}

	public setCostIronToBuild(cost: number) {
		this.costIronToBuild = cost;
	}

	public getCostOilConsumption() {
		return this.costOilConsumption;
	}

	public setCostOilConsumption(cost: number) {
		this.costOilConsumption = cost;
	}

	public getLife() {
		return this.life;
	}

	public setLife(life: number) {
		this.life = life;
	}

	public getMoveSpeed() {
		return this.moveSpeed;
	}

	public setMoveSpeed(speed: number) {
		this.moveSpeed = speed;
	}

	public getWeapons() {
		return this.weapons;
	}

	public addWeapon(weapon: Weapon) {
		this.weapons.push(weapon);
	}

	public removeWeapon(weapon: Weapon) {
		const index = this.weapons.indexOf(weapon);
		if (index > -1) {
			this.weapons.splice(index, 1);
		}
	}

	public getTimeToBuild() {
		return this.timeToBuild;
	}

	public getBuildProgress() {
		return this.buildProgress;
	}

	public addBuildProgress(progress: number) {
		this.buildProgress += progress;
	}

	public isBuilt() {
		return this.buildProgress >= this.timeToBuild;
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
