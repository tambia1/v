import { Animation, AnimationLooper } from "@src/utils/Animation";
import { getRandomNumber } from "@src/utils/Random";
import { FruitType } from "./Game";

type Props = {
	canvas: HTMLCanvasElement;
	fruitType: FruitType;
	fruitImage: HTMLImageElement;
	fruitSplashImage: HTMLImageElement;
	callback: () => void;
};

export class Fruit {
	public fruitType: FruitType;
	private fruitImage: HTMLImageElement;
	private fruitSplashImage: HTMLImageElement;
	private callback: () => void;
	public animation: Animation;
	public animationLooper: AnimationLooper;
	public isSplashed: boolean;
	private splashX: number;
	private splashY: number;

	constructor({ canvas, fruitType, fruitImage, fruitSplashImage, callback }: Props) {
		this.fruitType = fruitType;
		this.fruitImage = fruitImage;
		this.fruitSplashImage = fruitSplashImage;
		this.callback = callback;

		this.isSplashed = false;
		this.splashX = 0;
		this.splashY = 0;

		// 	//create new route
		const x1 = getRandomNumber(0, canvas.width);
		const x2 = getRandomNumber(0, canvas.width - 64);
		const y1 = canvas.height;
		const y2 = getRandomNumber(-canvas.height, 0);
		const time = getRandomNumber(2000, 3000);

		this.animation = new Animation({
			time: time,
			routes: [
				[x1, x2],
				[y1, y2, y1],
			],
			timing: Animation.TIMING_LINEAR,
			onCalculate: null,
			callbacks: [
				{
					position: time,
					callback: () => {
						this.callback();
					},
				},
			],
		});

		this.animation.resume();

		this.animationLooper = new AnimationLooper();
		this.animationLooper.setAnimations([this.animation]);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.animation.calculate();

		if (this.isSplashed === false) {
			ctx.drawImage(this.fruitImage, this.animation.results[0], this.animation.results[1], 64, 64);
		} else {
			ctx.drawImage(this.fruitSplashImage, this.splashX, this.splashY, 64, 64);
		}

		ctx.restore();
	}

	public isTouched(touchX: number, touchY: number) {
		if (this.isSplashed === false) {
			this.animation.calculate();

			const fruitX = this.animation.results[0];
			const fruitY = this.animation.results[1];

			if (touchX >= fruitX && touchY >= fruitY && touchX <= fruitX + 64 && touchY <= fruitY + 64) {
				this.splashX = this.animation.results[0];
				this.splashY = this.animation.results[1];

				return true;
			}
		}

		return false;
	}
}
