import { Animation } from "./Animation";
import { UtilsImage } from "./UtilsImage";
import { IType as IShootType, Shoot } from "./Shoot";

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
import imageWolf from "./images/units/wolf.png";
import imageSorcerer from "./images/units/sorcerer.png";
import imageTank from "./images/units/tank.png";

export type IType = "paladin" | "goblin" | "wolf" | "golem" | "orc" | "sorcerer" | "ninja" | "snake" | "skull" | "amazon" | "knight" | "giant" | "musketeer" | "hogRider" | "tank";

type IState = "idle" | "idleDown" | "idleUp" | "walkDown" | "walkUp" | "attackDown" | "attackUp";
type IDirection = "up" | "down";

type IUnit = {
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
	state: IState;
	states: { [K in IState]: number[] };
};

const types: { [K in IType]: IUnit } = {
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
			idle: [64, 64],
			idleDown: [0, 5],
			idleUp: [6, 11],
			walkDown: [16, 21],
			walkUp: [22, 27],
			attackDown: [32, 37],
			attackUp: [38, 43],
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
			idle: [64, 64],
			idleDown: [0, 5],
			idleUp: [6, 11],
			walkDown: [16, 21],
			walkUp: [22, 27],
			attackDown: [32, 38],
			attackUp: [39, 45],
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
			idle: [64, 64],
			idleDown: [0, 5],
			idleUp: [6, 11],
			walkDown: [16, 21],
			walkUp: [22, 27],
			attackDown: [32, 37],
			attackUp: [38, 43],
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
			idle: [64, 64],
			idleDown: [0, 5],
			idleUp: [6, 11],
			walkDown: [16, 23],
			walkUp: [24, 31],
			attackDown: [32, 37],
			attackUp: [38, 43],
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
			idle: [64, 64],
			idleDown: [0, 5],
			idleUp: [6, 11],
			walkDown: [16, 23],
			walkUp: [24, 31],
			attackDown: [32, 39],
			attackUp: [40, 47],
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
			idle: [64, 64],
			idleDown: [0, 5],
			idleUp: [6, 11],
			walkDown: [16, 21],
			walkUp: [22, 27],
			attackDown: [32, 37],
			attackUp: [38, 43],
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
			idle: [64, 64],
			idleDown: [0, 5],
			idleUp: [6, 11],
			walkDown: [16, 21],
			walkUp: [22, 27],
			attackDown: [32, 37],
			attackUp: [38, 43],
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
			idle: [64, 64],
			idleDown: [0, 5],
			idleUp: [6, 11],
			walkDown: [16, 21],
			walkUp: [22, 27],
			attackDown: [32, 36],
			attackUp: [38, 42],
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
			idle: [64, 64],
			idleDown: [0, 7],
			idleUp: [8, 15],
			walkDown: [16, 23],
			walkUp: [24, 31],
			attackDown: [32, 38],
			attackUp: [39, 45],
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
			idle: [48, 48],
			idleDown: [0, 5],
			idleUp: [6, 11],
			walkDown: [16, 21],
			walkUp: [22, 27],
			attackDown: [32, 39],
			attackUp: [40, 47],
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
			idle: [64, 64],
			idleDown: [0, 1],
			idleUp: [16, 17],
			walkDown: [0, 11],
			walkUp: [16, 27],
			attackDown: [32, 45],
			attackUp: [48, 61],
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
			idle: [64, 64],
			idleDown: [0, 1],
			idleUp: [16, 17],
			walkDown: [0, 15],
			walkUp: [16, 31],
			attackDown: [32, 40],
			attackUp: [48, 56],
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
			idle: [64, 64],
			idleDown: [0, 1],
			idleUp: [16, 17],
			walkDown: [0, 11],
			walkUp: [16, 27],
			attackDown: [32, 41],
			attackUp: [48, 57],
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
			idle: [64, 64],
			idleDown: [0, 1],
			idleUp: [16, 17],
			walkDown: [0, 7],
			walkUp: [16, 23],
			attackDown: [32, 41],
			attackUp: [48, 57],
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
			idle: [64, 64],
			idleDown: [0, 0],
			idleUp: [16, 16],
			walkDown: [32, 32],
			walkUp: [48, 48],
			attackDown: [32, 32],
			attackUp: [48, 48],
		},
	},
};

export class Unit {
	private type: IType = "paladin";
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
	private state: IState = types[this.type].state;

	private lifeStrokeStyle: string = "#ffffff66";
	private lifeFillStyle: string = "#99999966";
	private loading: number = 0;
	private shoot: Shoot | null = null;
	private isAttacking: boolean = false;
	private animationAlpha: Animation = new Animation({});
	private animationScale: Animation = new Animation({});
	private sprite: number = 0;

	private direction: "up" | "down" = "up";

	private x: number = 0;
	private y: number = 0;
	private w: number = 0;
	private h: number = 0;
	private cx: number = 0;
	private cy: number = 0;
	private ww: number = 0;
	private hh: number = 0;

	constructor(type: IType) {
		this.setType(type);
	}

	public setType(type: IType) {
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

	public getType(): IType {
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

		let sprite = types[this.type].states[this.state][0] + this.sprite;

		let col = Math.floor(sprite % this.spriteCols);
		let row = Math.floor(sprite / this.spriteCols);

		ctx.drawImage(this.image, col * this.spriteSize + 2, row * this.spriteSize + 2, this.spriteSize - 4, this.spriteSize - 4, this.cx - 5, this.cy - 5, this.ww + 10, this.hh + 10);

		// log sprite number
		// ctx.font = "bold 15px Helvetica";
		// ctx.fillStyle = "#000000";
		// ctx.fillText(Math.floor(this.sprite) + "", this.cx, this.cy);

		ctx.restore();
	}

	public drawLife(ctx: CanvasRenderingContext2D) {
		ctx.save();

		let lifeWidth = ((this.ww - 40) / this.lifeMax) * this.life;

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

	public setDirection(direction: IDirection) {
		this.direction = direction;
	}

	public getDirection() {
		return this.direction;
	}

	public setOpacity(alpha1: number, alpha2: number, time: number) {
		this.animationAlpha.setAnimation({
			time: time,
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
		this.animationAlpha.resume();
	}

	public getOpacity() {
		return this.animationAlpha.results[0];
	}

	public setScale(scale1: number, scale2: number, time: number) {
		// let animationTiming = scale2 > scale1 ? spa.Animation.TIMING_BOUNCE : spa.Animation.TIMING_EASE_OUT;

		this.animationScale.setAnimation({
			time: time,
			points: [[scale1, scale2]],
			timing: Animation.TIMING_EASE_OUT,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isDelayOnRepeat: false,
			repeat: 0,
			isCyclic: false,
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

	public setState(state: IState) {
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

		let spriteMax = types[this.type].states[this.state][1] - types[this.type].states[this.state][0] + 1;
		this.sprite = Math.min(this.sprite + timeDif / this.spriteTime, spriteMax) % spriteMax;
	}
}
