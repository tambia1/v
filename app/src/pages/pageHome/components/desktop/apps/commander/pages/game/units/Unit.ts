import { Drawable } from "../core/Drawable";
import { Entity } from "../core/Entity";
import { Hoverable } from "../core/Hoverable";
import { Position } from "../core/Position";
import { Selectable } from "../core/Selectable";
import { Updatable } from "../core/Updatable";
import { Weapon } from "../weapons/Weapon";

type UnitParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;

	costGoldToBuild: number;
	costIronToBuild: number;
	costOilConsumption: number;
	life: number;
	moveSpeed: number;
	weapons: Weapon[];
	timeToBuild: number;
};

export abstract class Unit extends Entity implements Drawable, Updatable, Selectable, Hoverable {
	protected costGoldToBuild: number;
	protected costIronToBuild: number;
	protected costOilConsumption: number;
	protected life: number;
	protected moveSpeed: number;
	protected weapons: Weapon[];
	protected timeToBuild: number;
	protected buildProgress: number;
	public position: Position;
	public isSelected = false;
	public isHovered = false;

	constructor(params: UnitParams) {
		super({
			name: params.name,
			image: params.image,
		});

		this.position = params.position;

		this.costGoldToBuild = params.costGoldToBuild;
		this.costIronToBuild = params.costIronToBuild;
		this.costOilConsumption = params.costOilConsumption;
		this.life = params.life;
		this.moveSpeed = params.moveSpeed;
		this.weapons = params.weapons;
		this.timeToBuild = params.timeToBuild;
		this.buildProgress = 0;
	}

	public setIsSelected(value: boolean) {
		this.isSelected = value;
	}

	public getIsSelected() {
		return this.isSelected;
	}

	public setIsHovered(value: boolean) {
		this.isHovered = value;
	}

	public getIsHovered() {
		return this.isHovered;
	}

	public abstract update(timeDif: number): void;
	public abstract draw(ctx: CanvasRenderingContext2D): void;

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
}
