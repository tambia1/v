import { Drawable } from "../core/Drawable";
import { Product } from "../core/Product";
import { Updatable } from "../core/Updatable";

type WeaponParams = {
	name: string;
	image: HTMLImageElement;

	costGold: number;
	costIron: number;
	damage: number;
	range: number;
	rateOfFire: number;
	accuracy: number;
};

export abstract class Weapon implements Product, Drawable, Updatable {
	public name: string;
	public image: HTMLImageElement;
	protected costGold: number;
	protected costIron: number;
	protected damage: number;
	protected range: number;
	protected rateOfFire: number;
	protected accuracy: number;
	protected x: number;
	protected y: number;
	protected w: number;
	protected h: number;
	public buildProgress: number;
	public timeToBuild: number;

	constructor(params: WeaponParams) {
		this.name = params.name;
		this.image = params.image;
		this.costGold = params.costGold;
		this.costIron = params.costIron;
		this.damage = params.damage;
		this.range = params.range;
		this.rateOfFire = params.rateOfFire;
		this.accuracy = params.accuracy;

		this.timeToBuild = 0;
		this.buildProgress = 0;

		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
	}

	public getTimeToBuild(): number {
		return this.timeToBuild;
	}

	public getBuildProgress(): number {
		return this.buildProgress;
	}

	public addBuildProgress(progress: number): void {
		this.buildProgress += progress;
	}

	public isBuilt(): boolean {
		return this.buildProgress >= this.timeToBuild;
	}

	public getCostGold() {
		return this.costGold;
	}

	public getCostIron() {
		return this.costIron;
	}

	public getDamage() {
		return this.damage;
	}

	public getRange() {
		return this.range;
	}

	public getRateOfFire() {
		return this.rateOfFire;
	}

	public getAccuracy() {
		return this.accuracy;
	}

	public setXY(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public setWH(w: number, h: number) {
		this.w = w;
		this.h = h;
	}

	public abstract update(timeDif: number): void;
	public abstract draw(ctx: CanvasRenderingContext2D): void;
}

export type { WeaponParams };
