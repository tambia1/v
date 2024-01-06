import { Animation } from "./Animation";
import Utils from "./Utils";

export type IType = "explosion1" | "explosion2" | "explosion3" | "explosion4" | "explosion5" | "explosion6" | "explosion7" | "explosion8";
type IExplosion = {
	image: HTMLImageElement;
	size: number;
	frames: number;
	cols: number;
	time: number;
};

const types: { [K in IType]: IExplosion } = {
	explosion1: { image: Utils.getImage("images/explosions/explosion_1_38_128.webp"), size: 128, frames: 38, cols: 8, time: 5000 },
	explosion2: { image: Utils.getImage("images/explosions/explosion_2_38_128.webp"), size: 128, frames: 38, cols: 8, time: 5000 },
	explosion3: { image: Utils.getImage("images/explosions/explosion_3_5_128.webp"), size: 128, frames: 5, cols: 5, time: 800 },
	explosion4: { image: Utils.getImage("images/explosions/explosion_4_39_128.webp"), size: 128, frames: 39, cols: 8, time: 5000 },
	explosion5: { image: Utils.getImage("images/explosions/explosion_5_5_128.webp"), size: 128, frames: 5, cols: 8, time: 800 },
	explosion6: { image: Utils.getImage("images/explosions/explosion_6_35_128.webp"), size: 128, frames: 35, cols: 8, time: 3000 },
	explosion7: { image: Utils.getImage("images/explosions/explosion_7_35_128.webp"), size: 128, frames: 35, cols: 8, time: 3000 },
	explosion8: { image: Utils.getImage("images/explosions/explosion_8_35_128.webp"), size: 128, frames: 35, cols: 8, time: 3000 },
};

export class Explosion {
	private type: IType = "explosion1";
	private image: HTMLImageElement = types[this.type].image;
	private frames: number = 0;
	private size: number = 0;
	private cols: number = 0;
	private time: number = 0;

	private isExploding: boolean = false;
	private animation: Animation = new Animation({});
	private sprite: number = 0;

	private x: number = 0;
	private y: number = 0;
	private w: number = 0;
	private h: number = 0;
	private cx: number = 0;
	private cy: number = 0;

	constructor(type: IType) {
		this.setType(type);
	}

	public setType(type: IType): void {
		this.type = type;
		this.image = types[this.type].image;

		this.isExploding = false;

		this.animation.setAnimation({
			time: this.time,
			points: [[0, this.frames]],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isDelayOnRepeat: false,
			repeat: 0,
			isCyclic: false,
			onCalculate: null,
			callbacks: [{ position: this.time, direction: Animation.DIRECTION_FORWARD, callback: this.onExplosionFinish }],
		});
		this.animation.setPositionInPercent(100);
		this.animation.pause();

		this.sprite = Math.floor(this.animation.results[0]);

		this.setWH(50, 50);
		this.setXY(0, 0);
	}

	public drawImage(ctx: CanvasRenderingContext2D): void {
		if (this.sprite < this.frames) {
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

	public setXY(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public startExplosion() {
		this.isExploding = true;

		this.animation.reset();
		this.animation.resume();
	}

	public stopExplosion() {
		this.isExploding = false;

		this.animation.setPositionInPercent(100);
		this.animation.pause();
	}

	public onExplosionFinish() {
		if (this.isExploding == true) {
			this.startExplosion();
		} else {
			this.stopExplosion();
		}
	}

	public update(_timeDif: number) {
		this.animation.calculate();
		this.sprite = Math.floor(this.animation.results[0]);

		this.cx = this.x - this.w / 2;
		this.cy = this.y - this.h / 2;
	}
}