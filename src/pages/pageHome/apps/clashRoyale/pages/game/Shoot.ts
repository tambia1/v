import { Animation } from "./Animation";
import { UtilsImage } from "./UtilsImage";

export type IType = "shoot1" | "shoot2";
type IShoot = {
	image: HTMLImageElement;
	size: number;
	cols: number;
	fireFrameStart: number;
	fireFrameEnd: number;
	fireTime: number;
	flyFramesStart: number;
	flyFramesEnd: number;
	flyTime: number;
	explodeFramesStart: number;
	explodeFramesEnd: number;
	explodeTime: number;
};

const types: { [K in IType]: IShoot } = {
	shoot1: {
		image: UtilsImage.getImage("./images/shoot/shoot_1_38_128.webp"),
		size: 128,
		cols: 8,
		fireFrameStart: 0,
		fireFrameEnd: 10,
		fireTime: 100,
		flyFramesStart: 11,
		flyFramesEnd: 13,
		flyTime: 500,
		explodeFramesStart: 14,
		explodeFramesEnd: 38,
		explodeTime: 500,
	},
	shoot2: {
		image: UtilsImage.getImage("./images/shoot/shoot_2_7_128.webp"),
		size: 128,
		cols: 5,
		fireFrameStart: 0,
		fireFrameEnd: 0,
		fireTime: 100,
		flyFramesStart: 1,
		flyFramesEnd: 1,
		flyTime: 500,
		explodeFramesStart: 2,
		explodeFramesEnd: 6,
		explodeTime: 500,
	},
};

export class Shoot {
	private type: IType = "shoot1";
	private image: HTMLImageElement = types[this.type].image;
	private size: number = types[this.type].size;
	private cols: number = types[this.type].cols;
	private fireFrameStart: number = types[this.type].fireFrameStart;
	private fireFrameEnd: number = types[this.type].fireFrameEnd;
	private fireTime: number = types[this.type].fireTime;
	private flyFramesStart: number = types[this.type].flyFramesStart;
	private flyFramesEnd: number = types[this.type].flyFramesEnd;
	private flyTime: number = types[this.type].flyTime;
	private explodeFramesStart: number = types[this.type].explodeFramesStart;
	private explodeFramesEnd: number = types[this.type].explodeFramesEnd;
	private explodeTime: number = types[this.type].explodeTime;

	private animationFire: Animation = new Animation({});
	private animationFly: Animation = new Animation({});
	private animationExplode: Animation = new Animation({});
	private animationMove: Animation = new Animation({});

	private isShooting: boolean = false;
	private moveTime: number = 0;
	private sprite: number = 0;

	private x1: number = 0;
	private y1: number = 0;
	private x2: number = 0;
	private y2: number = 0;
	private w: number = 0;
	private h: number = 0;
	private cx: number = 0;
	private cy: number = 0;

	private onFireEnd: (() => void) | null = null;
	private onFlyEnd: (() => void) | null = null;
	private onExplodeEnd: (() => void) | null = null;

	constructor(type: IType) {
		this.setType(type);
	}

	public setType(type: IType) {
		this.type = type;
		this.image = types[this.type].image;
		this.size = types[this.type].size;
		this.cols = types[this.type].cols;
		this.fireFrameStart = types[this.type].fireFrameStart;
		this.fireFrameEnd = types[this.type].fireFrameEnd;
		this.fireTime = types[this.type].fireTime;
		this.flyFramesStart = types[this.type].flyFramesStart;
		this.flyFramesEnd = types[this.type].flyFramesEnd;
		this.flyTime = types[this.type].flyTime;
		this.explodeFramesStart = types[this.type].explodeFramesStart;
		this.explodeFramesEnd = types[this.type].explodeFramesEnd;
		this.explodeTime = types[this.type].explodeTime;

		this.isShooting = false;
		this.moveTime = 0;

		this.animationFire.setAnimation({
			time: this.fireTime,
			points: [[this.fireFrameStart, this.fireFrameEnd]],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isDelayOnRepeat: false,
			repeat: 0,
			isCyclic: false,
			onCalculate: null,
			callbacks: [],
		});

		this.animationFly.setAnimation({
			time: this.flyTime,
			points: [[this.flyFramesStart, this.flyFramesEnd]],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isDelayOnRepeat: false,
			repeat: 999,
			isCyclic: true,
			onCalculate: null,
			callbacks: [{ position: this.flyTime, direction: Animation.DIRECTION_FORWARD, callback: this.handleOnFlyEnd }],
		});

		this.animationExplode.setAnimation({
			time: this.explodeTime,
			points: [[this.explodeFramesStart, this.explodeFramesEnd]],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isDelayOnRepeat: false,
			repeat: 0,
			isCyclic: false,
			onCalculate: null,
			callbacks: [{ position: this.explodeTime, direction: Animation.DIRECTION_FORWARD, callback: this.handleOnExplodeEnd }],
		});

		this.moveTime = this.flyTime;
		this.animationMove.setAnimation({
			time: this.moveTime,
			points: [
				[0, 0],
				[0, 0],
			],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: this.fireTime,
			isDelayOnRepeat: false,
			repeat: 0,
			isCyclic: false,
			onCalculate: null,
			callbacks: [{ position: this.moveTime, direction: Animation.DIRECTION_FORWARD, callback: this.onMoveEnd }],
		});

		this.sprite = Number(this.animationFire.results[0]);

		this.setWH(40, 40);
		this.setXY(0, 0, 0, 0);
	}

	public getType(): IType {
		return this.type;
	}

	public draw(ctx: CanvasRenderingContext2D) {
		if (this.isShooting == true && this.type != null) {
			ctx.save();

			let col = Math.floor(this.sprite % this.cols);
			let row = Math.floor(this.sprite / this.cols);

			ctx.drawImage(this.image, col * this.size, row * this.size, this.size, this.size, this.cx, this.cy, this.w, this.h);

			ctx.restore();
		}
	}

	public setWH(w: number, h: number) {
		this.w = w;
		this.h = h;
	}

	public setXY(x1: number, y1: number, x2: number, y2: number) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}

	public start(x1: number, y1: number, x2: number, y2: number, onFireEnd: (() => void) | null, onFlyEnd: (() => void) | null, onExplodeEnd: (() => void) | null): void {
		this.setXY(x1, y1, x2, y2);

		this.onFireEnd = onFireEnd;
		this.onFlyEnd = onFlyEnd;
		this.onExplodeEnd = onExplodeEnd;

		this.isShooting = true;

		this.animationFire.reset();
		this.animationFly.reset();
		this.animationExplode.reset();
		this.animationMove.reset();

		this.animationFire.resume();

		this.animationMove.setAnimation({
			time: this.moveTime,
			points: [
				[x1, x2],
				[y1, y2],
			],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: this.fireTime,
			isDelayOnRepeat: false,
			repeat: 0,
			isCyclic: false,
			onCalculate: null,
			callbacks: [{ position: this.moveTime, direction: Animation.DIRECTION_FORWARD, callback: this.onMoveEnd }],
		});

		this.animationMove.reset();
		this.animationMove.resume();
	}

	public stop() {
		this.isShooting = false;

		this.animationFire.reset();
		this.animationFly.reset();
		this.animationExplode.reset();
		this.animationMove.reset();
	}

	public handleOnFireEnd() {
		this.animationFire.pause();

		this.animationFly.reset();
		this.animationFly.resume();

		this.onFireEnd?.();
	}

	public handleOnFlyEnd() {
		this.animationFly.pause();

		this.animationExplode.reset();
		this.animationExplode.resume();

		this.onFlyEnd?.();
	}

	public handleOnExplodeEnd() {
		this.isShooting = false;

		this.animationExplode.pause();

		this.handleOnExplodeEnd?.();

		this.start(this.x1, this.y1, this.x2, this.y2, this.onFireEnd, this.onFlyEnd, this.onExplodeEnd);
	}

	public onMoveEnd() {
		this.animationMove.pause();
	}

	public update(_timeDif: number) {
		this.animationFly.calculate();
		this.animationMove.calculate();

		this.sprite = Math.round(this.animationFly.results[0]);

		this.cx = this.animationMove.results[0] - this.w / 2;
		this.cy = this.animationMove.results[1] - this.h / 2;
	}
}
