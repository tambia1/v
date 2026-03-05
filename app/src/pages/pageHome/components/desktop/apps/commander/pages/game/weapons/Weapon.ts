import { Entity } from "../core/Entity";
import { Position } from "../core/Position";

type WeaponParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	life: number;

	costGoldToBuild: number;
	costIronToBuild: number;
	costOilConsumption: number;
	moveSpeed: number;
	timeToBuild: number;

	damage: number;
	range: number;
	rateOfFire: number;
	accuracy: number;
};

export abstract class Weapon extends Entity {
	protected costGoldToBuild: number;
	protected costIronToBuild: number;
	protected costOilConsumption: number;
	protected moveSpeed: number;
	protected damage: number;
	protected range: number;
	protected rateOfFire: number;
	protected accuracy: number;

	constructor(params: WeaponParams) {
		super({
			name: params.name,
			image: params.image,
			position: params.position,
			life: params.life,
		});

		this.costGoldToBuild = params.costGoldToBuild;
		this.costIronToBuild = params.costIronToBuild;
		this.costOilConsumption = params.costOilConsumption;
		this.moveSpeed = params.moveSpeed;

		this.timeToBuild = params.timeToBuild;
		this.damage = params.damage;
		this.range = params.range;
		this.rateOfFire = params.rateOfFire;
		this.accuracy = params.accuracy;
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

	public getDamage() {
		return this.damage;
	}

	public setDamage(damage: number) {
		this.damage = damage;
	}

	public getRange() {
		return this.range;
	}

	public setRange(range: number) {
		this.range = range;
	}

	public getRateOfFire() {
		return this.rateOfFire;
	}

	public setRateOfFire(rateOfFire: number) {
		this.rateOfFire = rateOfFire;
	}

	public getAccuracy() {
		return this.accuracy;
	}

	public setAccuracy(accuracy: number) {
		this.accuracy = accuracy;
	}

	public draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);
	}
}
