import { UtilsMath } from "../../../clashRoyale/pages/game/UtilsMath";
import { Animation } from "../../../clashRoyale/pages/game/Animation";
import { IFruitType } from "./Game";

type IProps = {
	canvas: HTMLCanvasElement;
	fruitType: IFruitType;
	fruitImage: HTMLImageElement;
	fruitSplashImage: HTMLImageElement;
	callback: () => void;
};

export class Fruit {
	public fruitType: IFruitType;
	private fruitImage: HTMLImageElement;
	private fruitSplashImage: HTMLImageElement;
	private callback: () => void;
	public animation: Animation;
	public isSplashed: boolean;
	private splashX: number;
	private splashY: number;

	constructor({ canvas, fruitType, fruitImage, fruitSplashImage, callback }: IProps) {
		this.fruitType = fruitType;
		this.fruitImage = fruitImage;
		this.fruitSplashImage = fruitSplashImage;
		this.callback = callback;

		this.isSplashed = false;
		this.splashX = 0;
		this.splashY = 0;

		// 	//create new route
		const x1 = UtilsMath.getRandomNumber(0, canvas.width);
		const x2 = UtilsMath.getRandomNumber(0, canvas.width - 64);
		const y1 = canvas.height;
		const y2 = UtilsMath.getRandomNumber(-canvas.height, 0);
		const time = UtilsMath.getRandomNumber(2000, 3000);

		this.animation = new Animation({
			time: time,
			points: [
				[x1, x2],
				[y1, y2, y1],
			],
			timing: Animation.TIMING_LINEAR,
			direction: Animation.DIRECTION_FORWARD,
			delay: 0,
			isDelayOnRepeat: false,
			repeat: 0,
			isCyclic: false,
			onCalculate: null,
			callbacks: [
				{
					position: time,
					direction: Animation.DIRECTION_FORWARD,
					callback: () => {
						this.callback();
					},
				},
			],
		});

		this.animation.startLoop();
		this.animation.resume();
	}

	public draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.animation.calculate();

		if (this.isSplashed == false) {
			ctx.drawImage(this.fruitImage, this.animation.results[0], this.animation.results[1], 64, 64);
		} else {
			ctx.drawImage(this.fruitSplashImage, this.splashX, this.splashY, 64, 64);
		}

		ctx.restore();
	}

	public isTouched(touchX: number, touchY: number) {
		if (this.isSplashed == false) {
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