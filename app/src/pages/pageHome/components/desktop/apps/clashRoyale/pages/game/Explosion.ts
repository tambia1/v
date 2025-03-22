import { Animation } from "./Animation";
import { UtilsImage } from "./UtilsImage";

import imageExplosion1 from "./images/explosions/explosion_1_38_128.webp";
import imageExplosion2 from "./images/explosions/explosion_2_38_128.webp";
import imageExplosion3 from "./images/explosions/explosion_3_5_128.webp";
import imageExplosion4 from "./images/explosions/explosion_4_39_128.webp";
import imageExplosion5 from "./images/explosions/explosion_5_5_128.webp";
import imageExplosion6 from "./images/explosions/explosion_6_35_128.webp";
import imageExplosion7 from "./images/explosions/explosion_7_35_128.webp";
import imageExplosion8 from "./images/explosions/explosion_8_35_128.webp";

export type ExplosionType = "explosion1" | "explosion2" | "explosion3" | "explosion4" | "explosion5" | "explosion6" | "explosion7" | "explosion8";
type ExplosionData = {
	image: HTMLImageElement;
	size: number;
	frames: number;
	cols: number;
	time: number;
};

const types: { [K in ExplosionType]: ExplosionData } = {
	explosion1: { image: UtilsImage.getImage(imageExplosion1), size: 128, frames: 38, cols: 8, time: 5000 },
	explosion2: { image: UtilsImage.getImage(imageExplosion2), size: 128, frames: 38, cols: 8, time: 5000 },
	explosion3: { image: UtilsImage.getImage(imageExplosion3), size: 128, frames: 5, cols: 5, time: 800 },
	explosion4: { image: UtilsImage.getImage(imageExplosion4), size: 128, frames: 39, cols: 8, time: 5000 },
	explosion5: { image: UtilsImage.getImage(imageExplosion5), size: 128, frames: 5, cols: 8, time: 800 },
	explosion6: { image: UtilsImage.getImage(imageExplosion6), size: 128, frames: 35, cols: 8, time: 3000 },
	explosion7: { image: UtilsImage.getImage(imageExplosion7), size: 128, frames: 35, cols: 8, time: 3000 },
	explosion8: { image: UtilsImage.getImage(imageExplosion8), size: 128, frames: 35, cols: 8, time: 3000 },
};

export class Explosion {
	private type: ExplosionType = "explosion1";
	private image: HTMLImageElement = types[this.type].image;
	private frames = 0;
	private size = 0;
	private cols = 0;
	private time = 0;

	private isExploding = false;
	private animation: Animation = new Animation({});
	private sprite = 0;

	private x = 0;
	private y = 0;
	private w = 0;
	private h = 0;
	private cx = 0;
	private cy = 0;

	constructor(type: ExplosionType) {
		this.setType(type);
	}

	public setType(type: ExplosionType): void {
		this.type = type;
		this.image = types[this.type].image;

		this.isExploding = false;

		this.animation.setAnimation({
			time: this.time,
			routes: [[0, this.frames]],
			timing: Animation.TIMING_LINEAR,
			onCalculate: null,
			callbacks: [{ position: this.time, callback: this.onExplosionFinish }],
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

			const col = Math.floor(this.sprite % this.cols);
			const row = Math.floor(this.sprite / this.cols);

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
		if (this.isExploding === true) {
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
