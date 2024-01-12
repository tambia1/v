import { Animation } from "./Animation";
import { Shoot } from "./Shoot";
import { UtilsImage } from "./UtilsImage";
import { IType as IShootType } from "./Shoot";

import imageCastleRuin from "./images/castles/castleRuin.webp";
import imageCastle1 from "./images/castles/castle1.webp";
import imageCastle2 from "./images/castles/castle2.webp";
import imageCastle3 from "./images/castles/castle3.webp";
import imageCastle4 from "./images/castles/castle4.webp";
import imageCastle5 from "./images/castles/castle5.webp";
import imageCastle6 from "./images/castles/castle6.webp";
import imageCastle7 from "./images/castles/castle7.webp";
import imageCastle8 from "./images/castles/castle8.webp";
import imageCastle9 from "./images/castles/castle8.webp";
import imageCastle10 from "./images/castles/castle8.webp";

export type IType = "castleRuin" | "castle1" | "castle2" | "castle3" | "castle4" | "castle5" | "castle6" | "castle7" | "castle8" | "castle9" | "castle10";
type ICastle = { image: HTMLImageElement; lifeMax: number; weaponRange: number; weaponSpeed: number; weaponDamage: number; shootType: IShootType | null };

const types: { [K in IType]: ICastle } = {
	castleRuin: { image: UtilsImage.getImage(imageCastleRuin), lifeMax: 0, weaponRange: 0, weaponSpeed: 0, weaponDamage: 0, shootType: null },
	castle1: { image: UtilsImage.getImage(imageCastle1), lifeMax: 150, weaponRange: 90, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	castle2: { image: UtilsImage.getImage(imageCastle2), lifeMax: 250, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	castle3: { image: UtilsImage.getImage(imageCastle3), lifeMax: 350, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	castle4: { image: UtilsImage.getImage(imageCastle4), lifeMax: 450, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	castle5: { image: UtilsImage.getImage(imageCastle5), lifeMax: 550, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	castle6: { image: UtilsImage.getImage(imageCastle6), lifeMax: 650, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	castle7: { image: UtilsImage.getImage(imageCastle7), lifeMax: 750, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	castle8: { image: UtilsImage.getImage(imageCastle8), lifeMax: 850, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	castle9: { image: UtilsImage.getImage(imageCastle9), lifeMax: 950, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	castle10: { image: UtilsImage.getImage(imageCastle10), lifeMax: 1050, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
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
	private cw: number = 0;
	private ch: number = 0;
	private life: number = 0;
	private lifeMax: number = types[this.type].lifeMax;

	private lifeStrokeStyle: string = "#ffffff66";
	private lifeFillStyle: string = "#99999966";

	private weaponSpeed: number = types[this.type].weaponSpeed;
	private weaponDamage: number = types[this.type].weaponDamage;
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

	public setType(type: IType) {
		this.type = type;
		this.image = types[this.type].image;
		this.life = types[this.type].lifeMax;
		this.animationWeaponRangeAlpha.reset();
		this.weaponSpeed = types[this.type].weaponSpeed;
		this.weaponDamage = types[this.type].weaponDamage;
		this.weaponRange = types[this.type].weaponRange;

		this.setWH(60, 60);
		this.setXY(0, 0);

		this.cw = this.w * 1.1;
		this.ch = this.h * 1.1;
	}

	public getType() {
		return this.type;
	}

	public getLife() {
		return this.life;
	}

	public setLife(life: number) {
		this.life = life;
	}

	public drawImage(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.drawImage(this.image, this.cx, this.cy, this.cw, this.ch);
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

	public getX() {
		return this.x;
	}

	public getY() {
		return this.y;
	}

	public getWeaponSpeed() {
		return this.weaponSpeed;
	}

	public getWeaponDamage() {
		return this.weaponDamage;
	}

	public getweaponRange() {
		return this.weaponRange;
	}

	public drawWeaponRange(ctx: CanvasRenderingContext2D) {
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

	public drawLife(ctx: CanvasRenderingContext2D) {
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

	public drawAttack(ctx: CanvasRenderingContext2D) {
		if (this.shoot != null) {
			this.shoot.draw(ctx);
		}
	}

	public setLifeColor(strokeStyle: string, fillStyle: string) {
		this.lifeStrokeStyle = strokeStyle;
		this.lifeFillStyle = fillStyle;
	}

	public setWeaponRangeColor(fillStyle: string) {
		this.weaponRangeFillStyle = fillStyle;
	}

	public isXYInsideWeaponRange(x: number, y: number): boolean {
		return (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <= this.weaponRange * this.weaponRange;
	}

	public startAttacking(x: number, y: number) {
		this.isAttacking = true;

		if (this.shoot == null && this.shootType != null) {
			this.shoot = new Shoot(this.shootType);
			this.shoot.start(this.x, this.y, x, y, null, null, null);
		}

		this.shoot?.setXY(this.x, this.y, x, y);
	}

	public stopAttacking() {
		this.isAttacking = false;

		if (this.shoot != null) {
			this.shoot.stop();
			this.shoot = null;
		}
	}

	public getIsAttacking(): boolean {
		return this.isAttacking;
	}

	public setWeaponRangeOpacity(alpha1: number, alpha2: number, time: number) {
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

	public update(timeDif: number) {
		this.animationWeaponRangeAlpha.calculate();

		this.cx = this.x - this.cw / 2;
		this.cy = this.y - this.ch / 2;

		if (this.shoot != null) {
			this.shoot.update(timeDif);
		}

		this.weaponRangeAlpha += timeDif / this.weaponRangeAlphaTiming;
		this.weaponRangeAlpha = Math.min(this.weaponRangeAlpha, this.weaponRangeAlphaTiming);
	}
}
