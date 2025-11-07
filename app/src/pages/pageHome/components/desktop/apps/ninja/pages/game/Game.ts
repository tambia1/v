import { getRandomNumber } from "../../../../../../../../utils/Random";
import { UtilsImage } from "../../../clashRoyale/pages/game/UtilsImage";
import { UtilsTouch } from "../../../clashRoyale/pages/game/UtilsTouch";
import { Fruit } from "./Fruit";
import imageApple from "./images/apple.png";
import imageBanana from "./images/banana.png";
import imageGrape from "./images/grape.png";
import imageHand from "./images/hand.png";
import imageOrange from "./images/orange.png";
import imagePapaya from "./images/papaya.png";
import imagePineapple from "./images/pineapple.png";
import imageSplashGreen from "./images/splashGreen.png";
import imageSplashHand from "./images/splashHand.png";
import imageSplashOrange from "./images/splashOrange.png";
import imageSplashPurple from "./images/splashPurple.png";
import imageSplashRed from "./images/splashRed.png";
import imageSplashYellow from "./images/splashYellow.png";
import imageStrawberry from "./images/strawberry.png";
import imageWatermelon from "./images/watermelon.png";

// import sounds from "./sounds/sounds.mp3";

type Props = {
	board: HTMLElement;
};

export type FruitType = "fruit" | "hand";

export class Game {
	private canvas!: HTMLCanvasElement;
	private board: HTMLElement;
	private static arrImages: { type: FruitType; image1: HTMLImageElement; image2: HTMLImageElement }[] = [
		{ type: "fruit", image1: UtilsImage.getImage(imageApple), image2: UtilsImage.getImage(imageSplashRed) },
		{ type: "fruit", image1: UtilsImage.getImage(imageBanana), image2: UtilsImage.getImage(imageSplashYellow) },
		{ type: "fruit", image1: UtilsImage.getImage(imageGrape), image2: UtilsImage.getImage(imageSplashPurple) },
		{ type: "fruit", image1: UtilsImage.getImage(imageOrange), image2: UtilsImage.getImage(imageSplashOrange) },
		{ type: "fruit", image1: UtilsImage.getImage(imagePapaya), image2: UtilsImage.getImage(imageSplashOrange) },
		{ type: "fruit", image1: UtilsImage.getImage(imagePineapple), image2: UtilsImage.getImage(imageSplashYellow) },
		{ type: "fruit", image1: UtilsImage.getImage(imageStrawberry), image2: UtilsImage.getImage(imageSplashRed) },
		{ type: "fruit", image1: UtilsImage.getImage(imageWatermelon), image2: UtilsImage.getImage(imageSplashGreen) },
		{ type: "hand", image1: UtilsImage.getImage(imageHand), image2: UtilsImage.getImage(imageSplashHand) },
	];
	// private static soundDong = [0.531, 2.1];
	// private static soundSword = [
	// 	[2.733, 3.281],
	// 	[4.044, 4.49],
	// 	[5.281, 5.672],
	// 	[6.648, 6.984],
	// ];

	private gameState: "idle" | "playing" | "paused";
	private requestAnimationFrameId: number;

	private arrFruit: Fruit[];
	private arrFruitCallbackCounter;

	private goodScore: number;
	private badScore: number;
	private missScore: number;

	private isTouchStart: boolean;
	private arrTouchMove: { x: number; y: number; time: number }[];

	constructor({ board }: Props) {
		this.board = board;
		this.gameState = "idle";
		this.requestAnimationFrameId = 0;
		this.arrFruit = [];
		this.arrFruitCallbackCounter = 0;
		this.goodScore = 0;
		this.badScore = 0;
		this.missScore = 0;
		this.isTouchStart = false;
		this.arrTouchMove = [];

		this.initCanvas();
		this.initTouches();
	}

	private initCanvas() {
		this.canvas = document.createElement("canvas");
		this.board.appendChild(this.canvas);

		const dpr = 1; //window.devicePixelRatio || 1;

		this.canvas.width = this.board.offsetWidth * dpr;
		this.canvas.height = this.board.offsetHeight * dpr;
	}

	private initTouches() {
		UtilsTouch.listenToTouches({
			div: this.canvas,
			onTouchStart: (_e, _sx, _sy, x, y, _time) => {
				this.isTouchStart = true;
				this.arrTouchMove = [];
				this.arrTouchMove.push({ x: x, y: y, time: Date.now() });
			},
			onTouchMove: (_e, _sx, _sy, x, y, _time) => {
				if (this.isTouchStart === true) {
					this.arrTouchMove.push({ x: x, y: y, time: Date.now() });

					//spa.Audio.load('app/viewNinja/sounds/sounds.mp3');

					//play sound
					// if (spa.Audio.isSoundPlaying() == false) {
					// 	var soundIndex = spa.Math.getRandomNumber(0, SOUND_SWORD.length - 1);
					// 	spa.Audio.play(SOUND_SWORD[soundIndex], false);
					// }
				}
			},
			onTouchEnd: (_e, _sx, _sy, _x, _y, _time) => {
				this.isTouchStart = false;
			},
		});
	}

	public startGame() {
		this.draw();

		this.gameState = "playing";

		this.arrFruitCallbackCounter = 0;
		this.goodScore = 0;
		this.badScore = 0;

		this.createFruitAnimation();

		//play sound
		// spa.Audio.play(SOUND_DONG, false);
	}

	public stopGame() {
		this.gameState = "idle";
		window.cancelAnimationFrame(this.requestAnimationFrameId);
	}

	private createFruitAnimation() {
		const numberOfFruits = getRandomNumber(1, 5);

		this.arrFruit = new Array(numberOfFruits);

		for (let i = 0; i < this.arrFruit.length; i++) {
			const fruitImageIndex = getRandomNumber(0, Game.arrImages.length - 1);

			this.arrFruit[i] = new Fruit({
				canvas: this.canvas,
				fruitType: Game.arrImages[fruitImageIndex].type,
				fruitImage: Game.arrImages[fruitImageIndex].image1,
				fruitSplashImage: Game.arrImages[fruitImageIndex].image2,
				callback: () => this.fruitAnimationFinished(i),
			});
		}
	}

	private fruitAnimationFinished(fruitIndex: number) {
		if (this.arrFruit[fruitIndex].isSplashed === false && this.arrFruit[fruitIndex].fruitType === "fruit") {
			this.missScore++;
		}

		this.arrFruitCallbackCounter++;

		if (this.arrFruitCallbackCounter >= this.arrFruit.length) {
			this.arrFruitCallbackCounter = 0;

			this.createFruitAnimation();
		}
	}

	private draw() {
		const ctx = this.canvas.getContext("2d");

		if (!ctx) {
			return;
		}

		//draw sword line
		ctx.save();

		ctx.clearRect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.scale(1, 1);
		ctx.translate(0.5, 0.5);

		ctx.beginPath();

		ctx.rect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.clip();

		ctx.lineWidth = 1;
		ctx.lineCap = "round";

		//draw score values
		ctx.font = "bold 16px Helvetica";
		ctx.fillStyle = "#00ff00";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 3;
		ctx.shadowColor = "rgba(0, 0, 0, 1)";
		ctx.textAlign = "left";

		ctx.fillText(`Good: ${this.goodScore}`, 10, 40);

		//draw score values
		ctx.font = "bold 16px Helvetica";
		ctx.fillStyle = "#ff0000";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 3;
		ctx.shadowColor = "rgba(0, 0, 0, 1)";
		ctx.textAlign = "right";

		ctx.fillText(`Bad: ${this.badScore}`, ctx.canvas.offsetWidth - 10, 40);

		//draw score values
		ctx.font = "bold 16px Helvetica";
		ctx.fillStyle = "#ffff00";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 3;
		ctx.shadowColor = "rgba(0, 0, 0, 1)";
		ctx.textAlign = "center";

		ctx.fillText(`Miss: ${this.missScore}`, ctx.canvas.offsetWidth / 2, 40);

		//remove old touches
		const currentTime = Date.now();

		for (let i = this.arrTouchMove.length - 1; i > 0; i--) {
			if (currentTime - this.arrTouchMove[i].time > 150) {
				this.arrTouchMove.splice(0, i + 1);
				break;
			}
		}

		//draw fruits
		for (let i = 0; i < this.arrFruit.length; i++) {
			if (this.gameState === "playing" && this.isTouchStart === true && this.arrTouchMove.length > 0) {
				for (let j = this.arrTouchMove.length - 1; j > 0; j--) {
					const touchX = this.arrTouchMove[j].x;
					const touchY = this.arrTouchMove[j].y;

					const isTouched = this.arrFruit[i].isTouched(touchX, touchY);

					if (isTouched === true) {
						this.arrFruit[i].isSplashed = true;

						if (this.arrFruit[i].fruitType === "fruit") {
							this.goodScore++;
						} else {
							this.badScore++;
						}
					}
				}
			}

			this.arrFruit[i].draw(ctx);
		}

		//draw arrTouchMove
		if (this.arrTouchMove.length > 0) {
			ctx.fillStyle = "#ffffff";
			ctx.shadowColor = "#0000bb";
			ctx.shadowBlur = 5;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;

			ctx.beginPath();

			for (let i = this.arrTouchMove.length - 1; i > 0; i--) {
				ctx.lineTo(this.arrTouchMove[i].x, this.arrTouchMove[i].y);
			}

			for (let i = 0; i < this.arrTouchMove.length; i++) {
				ctx.lineTo(this.arrTouchMove[i].x + 4, this.arrTouchMove[i].y + 4);
			}

			ctx.fill();
		}

		ctx.restore();

		this.requestAnimationFrameId = window.requestAnimationFrame(this.draw.bind(this));
	}
}
