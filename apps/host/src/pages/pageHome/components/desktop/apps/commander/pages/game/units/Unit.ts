import { Entity } from "../core/Entity";
import { Position } from "../core/Position";
import { Weapon } from "../weapons/Weapon";

export type UnitType = "ground" | "air" | "sea";

type UnitParams = {
	name: string;
	image: HTMLImageElement;
	position: Position;
	life: number;
	color: string;

	costGold: number;
	costIron: number;
	costOil: number;
	moveSpeed: number;
	unitType: UnitType;
	weaponsSupported: Weapon[];
	weaponsEquipped?: Weapon[];
	timeToBuild: number;
};

export abstract class Unit extends Entity {
	public costGold: number;
	public costIron: number;
	public costOil: number;
	public unitType: UnitType;
	protected moveSpeed: number;
	protected weaponsSupported: Weapon[];
	protected weaponsEquipped: Weapon[];
	public weaponProductionQueue: Weapon[];
	protected movnigToPosition: Position | null;
	public status: "idle" | "moving" | "attacking";

	constructor(params: UnitParams) {
		super({
			name: params.name,
			image: params.image,
			position: params.position,
			life: params.life,
			color: params.color,
		});

		this.costGold = params.costGold;
		this.costIron = params.costIron;
		this.costOil = params.costOil;
		this.unitType = params.unitType;
		this.moveSpeed = params.moveSpeed;
		this.weaponsSupported = params.weaponsSupported;
		this.weaponsEquipped = params.weaponsEquipped ?? [...params.weaponsSupported];

		this.timeToBuild = params.timeToBuild;
		this.weaponProductionQueue = [];

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

	public isWeaponInProductionQueue(weapon: Weapon) {
		return this.weaponProductionQueue.some((item) => item.name === weapon.name);
	}

	public addWeaponToProductionQueue(weapon: Weapon) {
		if (this.isWeaponEquipped(weapon) || this.isWeaponInProductionQueue(weapon)) {
			return;
		}

		const clone = weapon.clone({ x: 0, y: 0 }) as Weapon;
		clone.buildProgress = 0;
		this.weaponProductionQueue.push(clone);
	}

	public getWeaponProductionQueue() {
		return this.weaponProductionQueue;
	}

	public getTimeToDestination(): number {
		if (this.status !== "moving" || !this.movnigToPosition) {
			return 0;
		}

		const dx = this.movnigToPosition.x - this.position.x;
		const dy = this.movnigToPosition.y - this.position.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		return distance / this.moveSpeed;
	}

	public move(x: number, y: number) {
		this.movnigToPosition = new Position({ x, y, w: this.position.w, h: this.position.h });
		this.status = "moving";
	}

	public override update(timeDif: number) {
		super.update(timeDif);

		// Process weapon production queue
		if (this.weaponProductionQueue.length > 0) {
			const currentWeapon = this.weaponProductionQueue[0];
			const progressToAdd = timeDif / 1000;
			currentWeapon.addBuildProgress(progressToAdd);

			if (currentWeapon.isBuilt()) {
				this.weaponProductionQueue.shift();
				this.equipWeapon(currentWeapon);
			}
		}

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

	private drawWeaponRanges(ctx: CanvasRenderingContext2D) {
		if (this.weaponsEquipped.length === 0) {
			return;
		}

		const centerX = this.position.getCenterX();
		const centerY = this.position.getCenterY();

		for (let i = 0; i < this.weaponsEquipped.length; i++) {
			const weapon = this.weaponsEquipped[i];
			const range = weapon.getRange();
			const color = weapon.rangeColor;

			ctx.save();

			// filled circle
			ctx.beginPath();
			ctx.arc(centerX, centerY, range, 0, Math.PI * 2);
			ctx.fillStyle = `${color}11`;
			ctx.fill();
			ctx.closePath();

			// dashed border
			ctx.beginPath();
			ctx.arc(centerX, centerY, range, 0, Math.PI * 2);
			ctx.strokeStyle = `${color}aa`;
			ctx.lineWidth = 1.5;
			ctx.setLineDash([6, 4]);
			ctx.stroke();
			ctx.closePath();

			// label at top-right of the circle
			ctx.setLineDash([]);
			ctx.font = "bold 11px monospace";
			ctx.fillStyle = `${color}aa`;
			ctx.textAlign = "left";
			ctx.textBaseline = "bottom";
			const labelAngle = -Math.PI / 4 - (i * Math.PI) / 8;
			const labelX = centerX + range * Math.cos(labelAngle);
			const labelY = centerY + range * Math.sin(labelAngle);
			ctx.fillText(weapon.name, labelX + 4, labelY - 2);

			ctx.restore();
		}
	}

	public draw(ctx: CanvasRenderingContext2D) {
		super.draw(ctx);

		ctx.save();

		this.drawWeaponRanges(ctx);

		for (let i = 0; i < this.weaponsEquipped.length; i++) {
			this.weaponsEquipped[i].draw(ctx);
		}

		ctx.restore();
	}
}
