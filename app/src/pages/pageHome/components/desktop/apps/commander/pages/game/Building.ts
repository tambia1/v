import { Animation } from "./core/Animation";
import { UtilsImage } from "./core/UtilsImage";
import imageBuilding1 from "./images/buildings/building1.webp";
import imageBuilding2 from "./images/buildings/building2.webp";
import imageBuilding3 from "./images/buildings/building3.webp";
import imageBuilding4 from "./images/buildings/building4.webp";
import imageBuilding5 from "./images/buildings/building5.webp";
import imageBuilding6 from "./images/buildings/building6.webp";
import imageBuilding7 from "./images/buildings/building7.webp";
import imageBuilding8 from "./images/buildings/building8.webp";
import imageBuilding9 from "./images/buildings/building8.webp";
import imageBuilding10 from "./images/buildings/building8.webp";
import imageBuildingRuin from "./images/buildings/buildingRuin.webp";
import type { ShootType as IShootType } from "./Shoot";
import { Shoot } from "./Shoot";

export type BuildingName =
	| "buildingRuin"
	| "building1"
	| "building2"
	| "building3"
	| "building4"
	| "building5"
	| "building6"
	| "building7"
	| "building8"
	| "building9"
	| "building10";
type BuildingData = { image: HTMLImageElement; lifeMax: number; weaponRange: number; weaponSpeed: number; weaponDamage: number; shootType: IShootType | null };

const names: { [K in BuildingName]: BuildingData } = {
	buildingRuin: { image: UtilsImage.getImage(imageBuildingRuin), lifeMax: 0, weaponRange: 0, weaponSpeed: 0, weaponDamage: 0, shootType: null },
	building1: { image: UtilsImage.getImage(imageBuilding1), lifeMax: 150, weaponRange: 90, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	building2: { image: UtilsImage.getImage(imageBuilding2), lifeMax: 250, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	building3: { image: UtilsImage.getImage(imageBuilding3), lifeMax: 350, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	building4: { image: UtilsImage.getImage(imageBuilding4), lifeMax: 450, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	building5: { image: UtilsImage.getImage(imageBuilding5), lifeMax: 550, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	building6: { image: UtilsImage.getImage(imageBuilding6), lifeMax: 650, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	building7: { image: UtilsImage.getImage(imageBuilding7), lifeMax: 750, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	building8: { image: UtilsImage.getImage(imageBuilding8), lifeMax: 850, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	building9: { image: UtilsImage.getImage(imageBuilding9), lifeMax: 950, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
	building10: { image: UtilsImage.getImage(imageBuilding10), lifeMax: 1050, weaponRange: 70, weaponSpeed: 1000, weaponDamage: 10, shootType: "shoot2" },
};

export class Building {
	private name: BuildingName = "buildingRuin";
	private image: HTMLImageElement = names[this.name].image;

	private x = 0;
	private y = 0;
	private w = 0;
	private h = 0;
	private cx = 0;
	private cy = 0;
	private cw = 0;
	private ch = 0;
	private life = 0;
	private lifeMax = 0;

	private lifeStrokeStyle = "#ffffff66";
	private lifeFillStyle = "#99999966";

	private weaponSpeed: number = names[this.name].weaponSpeed;
	private weaponDamage: number = names[this.name].weaponDamage;
	private weaponRange: number = names[this.name].weaponRange;
	private shootType: IShootType | null = names[this.name].shootType;
	private shoot: Shoot | null = null;
	private isAttacking = false;
	private weaponRangeFillStyle = "#ffffff33";
	private animationWeaponRangeAlpha: Animation = new Animation({});
	private weaponRangeAlpha = 0;
	private weaponRangeAlphaTiming = 0;

	constructor(type: BuildingName) {
		this.init();
		this.setType(type);
	}

	private init() {
		this.setWH(60, 60);
		this.setXY(0, 0);

		this.cw = this.w * 1.1;
		this.ch = this.h * 1.1;
	}

	public setType(type: BuildingName) {
		this.name = type;
		this.image = names[this.name].image;
		this.life = names[this.name].lifeMax;
		this.lifeMax = names[this.name].lifeMax;
		this.animationWeaponRangeAlpha.reset();
		this.weaponSpeed = names[this.name].weaponSpeed;
		this.weaponDamage = names[this.name].weaponDamage;
		this.weaponRange = names[this.name].weaponRange;
		this.shootType = names[this.name].shootType;
	}

	public getType() {
		return this.name;
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
		if (this.life > 0 && this.lifeMax > 0) {
			ctx.save();

			const lifeWidth = ((this.w - 20) / this.lifeMax) * this.life;

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
			routes: [[alpha1, alpha2]],
			timing: Animation.TIMING_EASE_OUT,
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
