import { Entity } from "../core/Entity";
import { Position } from "../core/Position";
import { type UnitType } from "../units/Unit";

type WeaponParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	life: number;

	costGold: number;
	costIron: number;
	costOil: number;
	moveSpeed: number;
	unitType: UnitType;
	timeToBuild: number;

	damage: number;
	range: number;
	rateOfFire: number;
	accuracy: number;
};

export abstract class Weapon extends Entity {
	public costGold: number;
	public costIron: number;
	public costOil: number;
	public unitType: UnitType;
	protected moveSpeed: number;
	protected damage: number;
	protected range: number;
	protected rateOfFire: number;
	protected accuracy: number;
	private fireCooldown: number;

	constructor(params: WeaponParams) {
		super({
			name: params.name,
			image: params.image,
			position: params.position,
			life: params.life,
		});

		this.costGold = params.costGold;
		this.costIron = params.costIron;
		this.costOil = params.costOil;
		this.unitType = params.unitType;
		this.moveSpeed = params.moveSpeed;

		this.timeToBuild = params.timeToBuild;
		this.damage = params.damage;
		this.range = params.range;
		this.rateOfFire = params.rateOfFire;
		this.accuracy = params.accuracy;
		this.fireCooldown = 0;
	}

	public canTarget(targetUnitType: UnitType): boolean {
		return this.unitType === targetUnitType;
	}

	public tryFire(timeDif: number): number {
		this.fireCooldown -= timeDif / 1000;

		if (this.fireCooldown <= 0) {
			this.fireCooldown = 1 / this.rateOfFire;

			const hit = Math.random() <= this.accuracy;
			return hit ? this.damage : 0;
		}

		return 0;
	}

	public resetCooldown() {
		this.fireCooldown = 0;
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
