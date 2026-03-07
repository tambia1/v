import { Entity } from "../core/Entity";
import { Position } from "../core/Position";
import { Weapon } from "../weapons/Weapon";

type UnitParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	life: number;

	costGold: number;
	costIron: number;
	costOil: number;
	moveSpeed: number;
	weapons: Weapon[];
	timeToBuild: number;
};

export abstract class Unit extends Entity {
	public costGold: number;
	public costIron: number;
	public costOil: number;
	protected moveSpeed: number;
	protected weapons: Weapon[];
	protected movnigToPosition: Position | null;
	public status: "idle" | "moving" | "attacking";

	constructor(params: UnitParams) {
		super({
			name: params.name,
			image: params.image,
			position: params.position,
			life: params.life,
		});

		this.costGold = params.costGold;
		this.costIron = params.costIron;
		this.costOil = params.costOil;
		this.moveSpeed = params.moveSpeed;
		this.weapons = params.weapons;

		this.timeToBuild = params.timeToBuild;

		this.movnigToPosition = null;
		this.status = "idle";
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

	public move(x: number, y: number) {
		this.movnigToPosition = new Position({ x, y, w: this.position.w, h: this.position.h });
	}

	public draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);

		ctx.save();

		for (let i = 0; i < this.weapons.length; i++) {
			this.weapons[i].draw(ctx);
		}

		ctx.restore();
	}
}
