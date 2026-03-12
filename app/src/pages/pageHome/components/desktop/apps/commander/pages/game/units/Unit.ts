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
	weaponsSupported: Weapon[];
	weaponsEquipped?: Weapon[];
	timeToBuild: number;
};

export abstract class Unit extends Entity {
	public costGold: number;
	public costIron: number;
	public costOil: number;
	protected moveSpeed: number;
	protected weaponsSupported: Weapon[];
	protected weaponsEquipped: Weapon[];
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
		this.weaponsSupported = params.weaponsSupported;
		this.weaponsEquipped = params.weaponsEquipped ?? [...params.weaponsSupported];

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

	private findWeaponIndex(weapons: Weapon[], weapon: Weapon) {
		return weapons.findIndex((item) => item.name === weapon.name);
	}

	public getWeaponsSupported() {
		return this.weaponsSupported;
	}

	public getWeaponsEquipped() {
		return this.weaponsEquipped;
	}

	public getWeapons() {
		return this.weaponsEquipped;
	}

	public supportsWeapon(weapon: Weapon) {
		return this.findWeaponIndex(this.weaponsSupported, weapon) > -1;
	}

	public isWeaponEquipped(weapon: Weapon) {
		return this.findWeaponIndex(this.weaponsEquipped, weapon) > -1;
	}

	public addWeaponSupported(weapon: Weapon) {
		if (!this.supportsWeapon(weapon)) {
			this.weaponsSupported.push(weapon);
		}
	}

	public removeWeaponSupported(weapon: Weapon) {
		const index = this.findWeaponIndex(this.weaponsSupported, weapon);
		if (index > -1) {
			this.weaponsSupported.splice(index, 1);
		}

		this.unequipWeapon(weapon);
	}

	public equipWeapon(weapon: Weapon) {
		if (this.supportsWeapon(weapon) && !this.isWeaponEquipped(weapon)) {
			this.weaponsEquipped.push(weapon);
		}
	}

	public unequipWeapon(weapon: Weapon) {
		const index = this.findWeaponIndex(this.weaponsEquipped, weapon);
		if (index > -1) {
			this.weaponsEquipped.splice(index, 1);
		}
	}

	public addWeapon(weapon: Weapon) {
		this.equipWeapon(weapon);
	}

	public removeWeapon(weapon: Weapon) {
		this.unequipWeapon(weapon);
	}

	public move(x: number, y: number) {
		this.movnigToPosition = new Position({ x, y, w: this.position.w, h: this.position.h });
		this.status = "moving";
	}

	public override update(timeDif: number) {
		super.update(timeDif);

		if (this.movnigToPosition && this.status === "moving") {
			const dx = this.movnigToPosition.x - this.position.x;
			const dy = this.movnigToPosition.y - this.position.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			const pixelsToMove = this.moveSpeed * (timeDif / 1000);

			if (distance <= pixelsToMove) {
				this.position.x = this.movnigToPosition.x;
				this.position.y = this.movnigToPosition.y;
				this.movnigToPosition = null;
				this.status = "idle";
			} else {
				const ratio = pixelsToMove / distance;
				this.position.x += dx * ratio;
				this.position.y += dy * ratio;
			}
		}
	}

	public draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);

		ctx.save();

		for (let i = 0; i < this.weaponsEquipped.length; i++) {
			this.weaponsEquipped[i].draw(ctx);
		}

		ctx.restore();
	}
}
