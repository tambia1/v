import { Animation } from "./core/Animation";
import { UtilsImage } from "./core/UtilsImage";
import imageAmazon from "./images/units/amazon.png";
import imageGiant from "./images/units/giant.png";
import imageGoblin from "./images/units/goblin.png";
import imageGolem from "./images/units/golem.png";
import imageHogrider from "./images/units/hogRider.png";
import imageKnight from "./images/units/knight.png";
import imageMusketeer from "./images/units/musketeer.png";
import imageNinja from "./images/units/ninja.png";
import imageOrc from "./images/units/orc.png";
import imagePaladin from "./images/units/paladin.png";
import imageSkull from "./images/units/skull.png";
import imageSnake from "./images/units/snake.png";
import imageSorcerer from "./images/units/sorcerer.png";
import imageTank from "./images/units/tank.png";
import imageTankLight from "./images/units/tankLight.png";
import imageWolf from "./images/units/wolf.png";
import { ShootType as IShootType, Shoot } from "./Shoot";

export type UnitType =
	| "paladin"
	| "goblin"
	| "wolf"
	| "golem"
	| "orc"
	| "sorcerer"
	| "ninja"
	| "snake"
	| "skull"
	| "amazon"
	| "knight"
	| "giant"
	| "musketeer"
	| "hogRider"
	| "tank"
	| "tankLight";

type UnitState = "idle" | "idleDown" | "idleUp" | "walkDown" | "walkUp" | "attackDown" | "attackUp";
type UnitDirection = "up" | "down";

type UnitData = {
	image: HTMLImageElement;
	elixirNeeded: number;
	lifeMax: number;
	life: number;
	moveSpeed: number;
	weaponSpeed: number;
	weaponDamage: number;
	weaponRange: number;
	shootType: IShootType | null;
	spriteSize: number;
	spriteCols: number;
	spriteTime: number;
	state: UnitState;
	states: { [K in UnitState]: number[] };
};

const types: { [K in UnitType]: UnitData } = {
	paladin: {
		image: UtilsImage.getImage(imagePaladin),
		elixirNeeded: 2,
		lifeMax: 100,
		life: 0,
		moveSpeed: 3500,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 200,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 6],
			idleUp: [6, 6],
			walkDown: [16, 6],
			walkUp: [22, 6],
			attackDown: [32, 6],
			attackUp: [38, 6],
		},
	},

	goblin: {
		image: UtilsImage.getImage(imageGoblin),
		elixirNeeded: 2,
		lifeMax: 100,
		life: 0,
		moveSpeed: 3000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 6],
			idleUp: [6, 6],
			walkDown: [16, 6],
			walkUp: [22, 6],
			attackDown: [32, 7],
			attackUp: [39, 7],
		},
	},

	wolf: {
		image: UtilsImage.getImage(imageWolf),
		elixirNeeded: 1,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 6],
			idleUp: [6, 6],
			walkDown: [16, 6],
			walkUp: [22, 6],
			attackDown: [32, 6],
			attackUp: [38, 6],
		},
	},

	golem: {
		image: UtilsImage.getImage(imageGolem),
		elixirNeeded: 3,
		lifeMax: 100,
		life: 0,
		moveSpeed: 3000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: "shoot2",
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 6],
			idleUp: [6, 6],
			walkDown: [16, 8],
			walkUp: [24, 8],
			attackDown: [32, 6],
			attackUp: [38, 6],
		},
	},

	orc: {
		image: UtilsImage.getImage(imageOrc),
		elixirNeeded: 4,
		lifeMax: 100,
		life: 0,
		moveSpeed: 3000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 6],
			idleUp: [6, 6],
			walkDown: [16, 8],
			walkUp: [24, 8],
			attackDown: [32, 8],
			attackUp: [40, 8],
		},
	},

	sorcerer: {
		image: UtilsImage.getImage(imageSorcerer),
		elixirNeeded: 4,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 6],
			idleUp: [6, 6],
			walkDown: [16, 6],
			walkUp: [22, 6],
			attackDown: [32, 6],
			attackUp: [38, 6],
		},
	},

	ninja: {
		image: UtilsImage.getImage(imageNinja),
		elixirNeeded: 2,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 6],
			idleUp: [6, 6],
			walkDown: [16, 6],
			walkUp: [22, 6],
			attackDown: [32, 6],
			attackUp: [38, 6],
		},
	},

	snake: {
		image: UtilsImage.getImage(imageSnake),
		elixirNeeded: 2,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 6],
			idleUp: [6, 6],
			walkDown: [16, 6],
			walkUp: [22, 6],
			attackDown: [32, 5],
			attackUp: [38, 5],
		},
	},

	skull: {
		image: UtilsImage.getImage(imageSkull),
		elixirNeeded: 2,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 8],
			idleUp: [8, 8],
			walkDown: [16, 8],
			walkUp: [24, 8],
			attackDown: [32, 7],
			attackUp: [39, 7],
		},
	},

	amazon: {
		image: UtilsImage.getImage(imageAmazon),
		elixirNeeded: 2,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [48, 1],
			idleDown: [0, 6],
			idleUp: [6, 6],
			walkDown: [16, 6],
			walkUp: [22, 6],
			attackDown: [32, 8],
			attackUp: [40, 8],
		},
	},

	knight: {
		image: UtilsImage.getImage(imageKnight),
		elixirNeeded: 2,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2500,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 2],
			idleUp: [16, 2],
			walkDown: [0, 12],
			walkUp: [16, 12],
			attackDown: [32, 14],
			attackUp: [48, 14],
		},
	},

	giant: {
		image: UtilsImage.getImage(imageGiant),
		elixirNeeded: 2,
		lifeMax: 200,
		life: 0,
		moveSpeed: 4000,
		weaponSpeed: 1000,
		weaponDamage: 20,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 2],
			idleUp: [16, 2],
			walkDown: [0, 16],
			walkUp: [16, 16],
			attackDown: [32, 9],
			attackUp: [48, 9],
		},
	},

	musketeer: {
		image: UtilsImage.getImage(imageMusketeer),
		elixirNeeded: 3,
		lifeMax: 100,
		life: 0,
		moveSpeed: 3000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 70,
		shootType: "shoot1",
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 2],
			idleUp: [16, 2],
			walkDown: [0, 12],
			walkUp: [16, 12],
			attackDown: [32, 10],
			attackUp: [48, 10],
		},
	},

	hogRider: {
		image: UtilsImage.getImage(imageHogrider),
		elixirNeeded: 3,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: null,
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 2],
			idleUp: [16, 2],
			walkDown: [0, 8],
			walkUp: [16, 8],
			attackDown: [32, 10],
			attackUp: [48, 10],
		},
	},

	tank: {
		image: UtilsImage.getImage(imageTank),
		elixirNeeded: 3,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 50,
		shootType: "shoot2",
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [64, 1],
			idleDown: [0, 1],
			idleUp: [16, 1],
			walkDown: [32, 1],
			walkUp: [48, 1],
			attackDown: [32, 1],
			attackUp: [48, 1],
		},
	},

	tankLight: {
		image: UtilsImage.getImage(imageTankLight),
		elixirNeeded: 3,
		lifeMax: 100,
		life: 0,
		moveSpeed: 2000,
		weaponSpeed: 1000,
		weaponDamage: 10,
		weaponRange: 90,
		shootType: "shoot3",
		spriteSize: 128,
		spriteCols: 16,
		spriteTime: 100,
		state: "idle",
		states: {
			idle: [127, 1],
			idleDown: [16, 1],
			idleUp: [0, 1],
			walkDown: [16, 1],
			walkUp: [0, 1],
			attackDown: [16, 1],
			attackUp: [0, 1],
		},
	},
};

export class Unit {
	private type: UnitType = "paladin";
	private image: HTMLImageElement = types[this.type].image;
	private elixirNeeded: number = types[this.type].elixirNeeded;
	private lifeMax: number = types[this.type].lifeMax;
	private life: number = types[this.type].life;
	private moveSpeed: number = types[this.type].moveSpeed;
	private weaponSpeed: number = types[this.type].weaponSpeed;
	private weaponDamage: number = types[this.type].weaponDamage;
	private weaponRange: number = types[this.type].weaponRange;
	private shootType: IShootType | null = types[this.type].shootType;
	private spriteSize: number = types[this.type].spriteSize;
	private spriteCols: number = types[this.type].spriteCols;
	private spriteTime: number = types[this.type].spriteTime;
	private state: UnitState = types[this.type].state;

	private lifeStrokeStyle = "#ffffff66";
	private lifeFillStyle = "#99999966";
	private loading = 0;
	private shoot: Shoot | null = null;
	private isAttacking = false;
	private animationAlpha: Animation = new Animation({});
	private animationScale: Animation = new Animation({});
	private sprite = 0;

	private direction: "up" | "down" = "up";

	private x = 0;
	private y = 0;
	private w = 0;
	private h = 0;
	private cx = 0;
	private cy = 0;
	private ww = 0;
	private hh = 0;

	constructor(type: UnitType) {
		this.setType(type);
	}

	public setType(type: UnitType) {
		this.type = type;
		this.image = types[this.type].image;
		this.elixirNeeded = types[this.type].elixirNeeded;
		this.lifeMax = types[this.type].lifeMax;
		this.life = types[this.type].life;
		this.moveSpeed = types[this.type].moveSpeed;
		this.weaponSpeed = types[this.type].weaponSpeed;
		this.weaponDamage = types[this.type].weaponDamage;
		this.weaponRange = types[this.type].weaponRange;
		this.shootType = types[this.type].shootType;
		this.spriteSize = types[this.type].spriteSize;
		this.spriteCols = types[this.type].spriteCols;
		this.spriteTime = types[this.type].spriteTime;

		this.life = this.lifeMax;
		this.loading = 0;
		this.shoot = null;
		this.isAttacking = false;

		this.animationAlpha.reset();
		this.animationScale.reset();

		this.state = "idle";
		this.sprite = 0;

		this.setWH(55, 55);
		this.setXY(0, 0);

		this.setOpacity(1, 1, 0);
		this.setScale(1, 1, 0);

		this.setState("idle");
	}

	public getType(): UnitType {
		return this.type;
	}

	public getLife() {
		return this.life;
	}

	public setLife(life: number) {
		this.life = life;
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

	public drawImage(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.globalAlpha = this.animationAlpha.results[0];

		const sprite = types[this.type].states[this.state][0] + this.sprite;

		const col = Math.floor(sprite % this.spriteCols);
		const row = Math.floor(sprite / this.spriteCols);

		ctx.drawImage(
			this.image,
			col * this.spriteSize + 2,
			row * this.spriteSize + 2,
			this.spriteSize - 4,
			this.spriteSize - 4,
			this.cx - 5,
			this.cy - 5,
			this.ww + 10,
			this.hh + 10,
		);

		// log sprite number
		// ctx.font = "bold 15px Helvetica";
		// ctx.fillStyle = "#000000";
		// ctx.fillText(Math.floor(this.sprite) + "", this.cx, this.cy);

		ctx.restore();
	}

	public drawLife(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const lifeWidth = ((this.ww - 40) / this.lifeMax) * this.life;

		ctx.beginPath();
		ctx.fillStyle = this.lifeFillStyle;
		ctx.rect(this.cx + 20, this.cy + this.h - 10, lifeWidth, 5);
		ctx.fill();

		ctx.beginPath();
		ctx.strokeStyle = this.lifeStrokeStyle;
		ctx.rect(this.cx + 20, this.cy + this.h - 10, lifeWidth, 5);
		ctx.stroke();

		ctx.restore();
	}

	public drawWeaponRange(ctx: CanvasRenderingContext2D) {
		ctx.save();

		ctx.fillStyle = "#00000033";
		ctx.beginPath();
		ctx.moveTo(this.cx + this.ww / 2, this.cy + this.h / 2);
		ctx.arc(this.cx + this.ww / 2, this.cy + this.h / 2, this.weaponRange, 1 * Math.PI * 2, 0 * Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}

	public drawLoading(ctx: CanvasRenderingContext2D) {
		if (this.loading < 1) {
			ctx.save();

			ctx.fillStyle = "#ffffff88";
			ctx.beginPath();
			ctx.moveTo(this.cx + this.ww / 2, this.cy + this.hh / 2);
			ctx.arc(this.cx + this.ww / 2, this.cy + this.hh / 2, this.ww / 2, this.loading * Math.PI * 2, 0 * Math.PI * 2);
			ctx.fill();

			ctx.restore();
		}
	}

	public drawAttack(ctx: CanvasRenderingContext2D) {
		if (this.shoot != null) {
			this.shoot.draw(ctx);
		}
	}

	public setWH(w: number, h: number) {
		this.w = w;
		this.h = h;
	}

	public setXY(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public setX(x: number) {
		this.x = x;
	}

	public setY(y: number) {
		this.y = y;
	}

	public getX() {
		return this.x;
	}

	public getY() {
		return this.y;
	}

	public getMoveSpeed() {
		return this.moveSpeed;
	}

	public setDirection(direction: UnitDirection) {
		this.direction = direction;
	}

	public getDirection() {
		return this.direction;
	}

	public setOpacity(alpha1: number, alpha2: number, time: number) {
		this.animationAlpha.setAnimation({
			time: time,
			routes: [[alpha1, alpha2]],
			timing: Animation.TIMING_EASE_OUT,
			onCalculate: null,
			callbacks: [],
		});
		this.animationAlpha.resume();
	}

	public getOpacity() {
		return this.animationAlpha.results[0];
	}

	public setScale(scale1: number, scale2: number, time: number) {
		// let animationTiming = scale2 > scale1 ? spa.Animation.TIMING_BOUNCE : spa.Animation.TIMING_EASE_OUT;

		this.animationScale.setAnimation({
			time: time,
			routes: [[scale1, scale2]],
			timing: Animation.TIMING_EASE_OUT,
			onCalculate: null,
			callbacks: [],
		});

		this.animationScale.resume();
	}

	public getScale() {
		return this.animationScale.results[0];
	}

	public setLoading(loading: number) {
		this.loading = loading;
	}

	public setLifeColor(strokeStyle: string, fillStyle: string) {
		this.lifeStrokeStyle = strokeStyle;
		this.lifeFillStyle = fillStyle;
	}

	public isXYInsideUnit(x: number, y: number) {
		return x >= this.x - this.ww / 2 && y >= this.y - this.hh / 2 && x <= this.x + this.ww / 2 && y <= this.y + this.hh / 2;
	}

	public isXYInsideWeaponRange(x: number, y: number) {
		return (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <= this.weaponRange * this.weaponRange;
	}

	public startAttacking(x: number, y: number) {
		this.isAttacking = true;

		if (this.shoot == null && this.shootType != null) {
			this.shoot = new Shoot(this.shootType);
			this.shoot.start(this.x, this.y, x, y, null, null, null);
		}

		if (this.shoot != null) {
			this.shoot.setXY(this.x, this.y, x, y);
		}
	}

	public stopAttacking() {
		this.isAttacking = false;

		if (this.shoot != null) {
			this.shoot.stop();
			this.shoot = null;
		}
	}

	public getIsAttacking() {
		return this.isAttacking;
	}

	public setState(state: UnitState) {
		this.state = state;
		this.sprite = 0;
	}

	public getState() {
		return this.state;
	}

	public getElixirNeeded() {
		return this.elixirNeeded;
	}

	public update(timeDif: number) {
		this.animationAlpha.calculate();
		this.animationScale.calculate();

		this.ww = this.w * this.animationScale.results[0];
		this.hh = this.h * this.animationScale.results[0];

		this.cx = this.x - this.ww / 2;
		this.cy = this.y - this.hh / 2;

		if (this.shoot != null) {
			this.shoot.update(timeDif);
		}

		const spriteMax = types[this.type].states[this.state][1];
		this.sprite = Math.min(this.sprite + timeDif / this.spriteTime, spriteMax) % spriteMax;
	}
}
