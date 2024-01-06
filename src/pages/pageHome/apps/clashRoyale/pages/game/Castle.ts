import { Animation } from "./Animation";
import { Shoot } from "./Shoot";
import Utils from "./Utils";
import { IType as IShootType } from "./Shoot";

export type IType = "castleRuin" | "castle1" | "castle2" | "castle3" | "castle4" | "castle5" | "castle6" | "castle7" | "castle8" | "castle9" | "castle10";
type ICastle = { image: HTMLImageElement; lifeMax: number; weaponRange: number; shootType: IShootType | null };

const types: { [K in IType]: ICastle } = {
	castleRuin: { image: Utils.getImage("./images/castles/castleRuin.webp"), lifeMax: 0, weaponRange: 0, shootType: null },
	castle1: { image: Utils.getImage("./images/castles/castle1.webp"), lifeMax: 150, weaponRange: 90, shootType: "shoot2" },
	castle2: { image: Utils.getImage("./images/castles/castle2.webp"), lifeMax: 250, weaponRange: 70, shootType: "shoot2" },
	castle3: { image: Utils.getImage("./images/castles/castle3.webp"), lifeMax: 350, weaponRange: 70, shootType: "shoot2" },
	castle4: { image: Utils.getImage("./images/castles/castle4.webp"), lifeMax: 450, weaponRange: 70, shootType: "shoot2" },
	castle5: { image: Utils.getImage("./images/castles/castle5.webp"), lifeMax: 550, weaponRange: 70, shootType: "shoot2" },
	castle6: { image: Utils.getImage("./images/castles/castle6.webp"), lifeMax: 650, weaponRange: 70, shootType: "shoot2" },
	castle7: { image: Utils.getImage("./images/castles/castle7.webp"), lifeMax: 750, weaponRange: 70, shootType: "shoot2" },
	castle8: { image: Utils.getImage("./images/castles/castle8.webp"), lifeMax: 850, weaponRange: 70, shootType: "shoot2" },
	castle9: { image: Utils.getImage("./images/castles/castle9.webp"), lifeMax: 950, weaponRange: 70, shootType: "shoot2" },
	castle10: { image: Utils.getImage("./images/castles/castle10.webp"), lifeMax: 1050, weaponRange: 70, shootType: "shoot2" },
};

export class Castle {
	private type: IType = "castleRuin";
	private image: HTMLImageElement = types[this.type].image;

	private x: number = 0;
	private y: number = 0;
	private w: number = 0;
	private h: number = 0;
	private cx: number = 0;
	private cy: number = 0;
	private life: number = 0;
	private lifeMax: number = types[this.type].lifeMax;

	private lifeStrokeStyle: string = "#ffffff66";
	private lifeFillStyle: string = "#99999966";

	private weaponRange: number = types[this.type].weaponRange;
	private shootType: IShootType | null = types[this.type].shootType;
	private shoot: Shoot | null = null;
	private isAttacking: boolean = false;
	private weaponRangeFillStyle: string = "#ffffff33";
	private animationWeaponRangeAlpha: Animation = new Animation({});
	private weaponRangeAlpha: number = 0;
	private weaponRangeAlphaTiming: number = 0;

	constructor(type: IType) {
		this.setType(type);
	}

	public setType(type: IType): void {
		this.type = type;
		this.image = types[this.type].image;
		this.life = types[this.type].lifeMax;
		this.animationWeaponRangeAlpha.reset();

		this.setWH(60, 60);
		this.setXY(0, 0);
	}

	public getType(): IType {
		return this.type;
	}

	public drawImage(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.drawImage(this.image, this.cx, this.cy, this.w, this.h);
		ctx.restore();
	}

	public setWH(w: number, h: number) {
		this.w = w;
		this.h = h;
	}

	public setXY(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public drawWeaponRange(ctx: CanvasRenderingContext2D): void {
		if (this.life > 0) {
			ctx.save();

			ctx.globalAlpha = this.animationWeaponRangeAlpha.results[0];
			ctx.fillStyle = this.weaponRangeFillStyle;
			ctx.beginPath();
			ctx.arc(this.cx + this.w / 2, this.cy + this.h / 2, this.weaponRange, 1 * Math.PI * 2, 0 * Math.PI * 2);
			ctx.fill();

			ctx.restore();
		}
	}

	public drawLife(ctx: CanvasRenderingContext2D): void {
		if (this.life > 0) {
			ctx.save();

			let lifeWidth = ((this.w - 20) / this.lifeMax) * this.life;

			ctx.beginPath();
			ctx.fillStyle = this.lifeFillStyle;
			ctx.rect(this.cx + 10, this.cy + this.h - 10, lifeWidth, 5);
			ctx.fill();

			ctx.beginPath();
			ctx.strokeStyle = this.lifeStrokeStyle;
			ctx.rect(this.cx + 10, this.cy + this.h - 10, lifeWidth, 5);
			ctx.stroke();

			ctx.restore();
		}
	}

	public drawAttack(ctx: CanvasRenderingContext2D): void {
		if (this.shoot != null) {
			this.shoot.draw(ctx);
		}
	}

	public setLifeColor(strokeStyle: string, fillStyle: string): void {
		this.lifeStrokeStyle = strokeStyle;
		this.lifeFillStyle = fillStyle;
	}

	public setWeaponRangeColor(fillStyle: string): void {
		this.weaponRangeFillStyle = fillStyle;
	}

	public isXYInsideWeaponRange(x: number, y: number): boolean {
		return (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <= this.weaponRange * this.weaponRange;
	}

	public startAttacking(x: number, y: number): void {
		this.isAttacking = true;

		if (this.shoot == null && this.shootType != null) {
			this.shoot = new Shoot(this.shootType);
			this.shoot.start(this.x, this.y, x, y, null, null, null);
		}

		this.shoot?.setXY(this.x, this.y, x, y);
	}

	public stopAttacking(): void {
		this.isAttacking = false;

		if (this.shoot != null) {
			this.shoot.stop();
			this.shoot = null;
		}
	}

	public getIsAttacking(): boolean {
		return this.isAttacking;
	}

	public setWeaponRangeOpacity(alpha1: number, alpha2: number, time: number): void {
		this.weaponRangeAlpha = alpha2;

		this.animationWeaponRangeAlpha.setAnimation({
			time,
			points: [[alpha1, alpha2]],
			timing: Animation.TIMING_EASE_OUT,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isDelayOnRepeat: false,
			repeat: 0,
			isCyclic: false,
			onCalculate: null,
			callbacks: [],
		});
		this.animationWeaponRangeAlpha.resume();
	}

	public getWeaponRangeOpacity(): number {
		return this.animationWeaponRangeAlpha.results[0];
	}

	public update(timeDif: number): void {
		this.animationWeaponRangeAlpha.calculate();

		this.cx = this.x - this.w / 2;
		this.cy = this.y - this.h / 2;

		if (this.shoot != null) {
			this.shoot.update(timeDif);
		}

		this.weaponRangeAlpha += timeDif / this.weaponRangeAlphaTiming;
		this.weaponRangeAlpha = Math.min(this.weaponRangeAlpha, this.weaponRangeAlphaTiming);
	}
}
