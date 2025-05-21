import { UtilsCanvas } from "./UtilsCanvas";
import { UtilsTouch } from "./UtilsTouch";

type GameProps = {
	board: HTMLElement;
	onGameOver: () => void;
};

type XY = {
	x: number;
	y: number;
};

export class Game {
	private board: HTMLElement;
	private onGameOver: () => void;

	private canvas!: HTMLCanvasElement;
	private ctx!: CanvasRenderingContext2D;

	private requestAnimationFrameId!: number;
	private timeOld!: number;
	private timeNow!: number;
	private timeDif!: number;

	private grid!: number[][];
	private snake!: XY[];
	private food!: XY;

	private timeAcc!: number;
	private timeSpeed!: number;
	private gameState!: "ready" | "playing" | "paused" | "lost" | "gameOver";
	private snakeDirection!: "up" | "down" | "left" | "right";

	constructor({ board, onGameOver }: GameProps) {
		this.board = board;
		this.onGameOver = onGameOver;

		this.initCanvas();
		this.initTouches();
		this.initEngine();

		this.reset();
	}

	private initCanvas() {
		this.canvas = document.createElement("canvas");
		this.board.appendChild(this.canvas);

		this.canvas.width = this.board.offsetWidth;
		this.canvas.height = this.board.offsetHeight;

		this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
	}

	private initTouches() {
		UtilsTouch.listenToTouches({
			div: this.canvas,
			onTouchEnd: (_e, _sx, _sy, x, y, _time) => {
				if (this.gameState !== "playing") {
					return;
				}

				const xx = Math.floor(x / (this.canvas.width / this.grid[0].length));
				const yy = Math.floor(y / (this.canvas.height / this.grid.length));

				if (this.snakeDirection === "right" || this.snakeDirection === "left") {
					if (yy > this.snake[0].y) {
						this.snakeDirection = "down";
					} else if (yy < this.snake[0].y) {
						this.snakeDirection = "up";
					}
				} else if (this.snakeDirection === "up" || this.snakeDirection === "down") {
					if (xx > this.snake[0].x) {
						this.snakeDirection = "right";
					} else if (xx < this.snake[0].x) {
						this.snakeDirection = "left";
					}
				}
			},
		});
	}

	private initEngine() {
		this.requestAnimationFrameId = window.requestAnimationFrame(this.initEngine.bind(this));

		this.timeOld = this.timeOld || performance.now();
		this.timeNow = performance.now();
		this.timeDif = this.timeNow - this.timeOld;

		const fps = 60;

		if (this.timeDif < 1000 / fps) {
			return;
		}

		this.timeOld = this.timeNow;

		this.update(this.timeDif);
		this.draw(this.ctx);
	}

	public reset() {
		this.grid = Array(20)
			.fill(0)
			.map(() => Array(20).fill(0));

		this.snakeDirection = "right";
		this.snake = [];
		this.snake.push({ x: 10, y: 10 });

		this.food = { x: 0, y: 0 };
		this.createFood();

		this.timeAcc = 0;
		this.timeSpeed = 700;
		this.gameState = "ready";
	}

	public start() {
		this.gameState = "playing";
	}

	public stop() {
		this.gameState = "paused";
	}

	public destroy() {
		this.stop();

		this.board.removeChild(this.canvas);

		window.cancelAnimationFrame(this.requestAnimationFrameId);
		this.requestAnimationFrameId = 0;
	}

	private draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.drawInit(ctx);
		this.drawGrid(ctx);
		this.drawFood(ctx);
		this.drawSnake(ctx);
		this.drawScore(ctx);
		this.drawGameOver(ctx);

		ctx.restore();
	}

	private update(timeDif: number) {
		this.updateSnake(timeDif);
		this.updateGameOver();
	}

	private drawInit(ctx: CanvasRenderingContext2D) {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(1, 1);
		ctx.clearRect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);

		ctx.beginPath();
		ctx.rect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.clip();
	}

	private drawGrid(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const w = ctx.canvas.width / this.grid[0].length;
		const h = ctx.canvas.height / this.grid.length;

		for (let i = 0; i < this.grid.length; i++) {
			for (let j = 0, c = i; j < this.grid[i].length; j++, c++) {
				const x = j * w;
				const y = i * h;

				if (c % 2 === 0) {
					ctx.fillStyle = "#ddddff";
				} else {
					ctx.fillStyle = "#aaaaff";
				}

				ctx.fillRect(x, y, w, h);
			}
		}

		ctx.restore();
	}

	private drawFood(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const w = ctx.canvas.width / this.grid[0].length;
		const h = ctx.canvas.height / this.grid.length;

		const x = this.food.x * w;
		const y = this.food.y * h;

		ctx.fillStyle = "#00ff00";
		ctx.fillRect(x, y, w, h);

		ctx.restore();
	}

	private drawSnake(ctx: CanvasRenderingContext2D) {
		ctx.save();

		const w = ctx.canvas.width / this.grid[0].length;
		const h = ctx.canvas.height / this.grid.length;

		for (let i = 0; i < this.snake.length; i++) {
			const x = this.snake[i].x * w;
			const y = this.snake[i].y * h;

			ctx.fillStyle = "#ff0000";
			ctx.fillRect(x, y, w, h);
		}

		ctx.restore();
	}

	private drawScore(ctx: CanvasRenderingContext2D) {
		const w = 80;
		const h = 30;
		const x = ctx.canvas.width / 2 - w / 2;
		const y = ctx.canvas.height - h - 10;

		ctx.save();

		ctx.fillStyle = "#00000088";
		ctx.beginPath();
		UtilsCanvas.rectRound(ctx, x, y, w, h, 5);
		ctx.fill();

		ctx.restore();

		ctx.save();

		ctx.font = "bold 12px Helvetica";
		ctx.fillStyle = "#ffffff";
		ctx.shadowColor = "#000000";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		const score = `Score: ${this.snake.length}`;

		ctx.fillText(score, x + w / 2, y + h / 2);

		ctx.restore();
	}

	private drawGameOver(ctx: CanvasRenderingContext2D) {
		if (this.gameState !== "gameOver") {
			return;
		}

		const x = ctx.canvas.width / 2;
		const y = ctx.canvas.height / 2;

		ctx.save();

		ctx.font = "bold 16px Helvetica";
		ctx.fillStyle = "#ffffff";
		ctx.shadowColor = "#000000";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 2;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		ctx.fillText("Game Over", x, y);

		ctx.restore();
	}

	private updateGameOver() {
		if (this.gameState === "gameOver") {
			return;
		}

		if (this.gameState === "lost") {
			this.gameState = "gameOver";
			this.onGameOver?.();
		}
	}

	private updateSnake(timeDif: number) {
		this.timeAcc += timeDif;

		while (this.timeAcc >= this.timeSpeed) {
			this.moveSnake();
			this.timeAcc -= this.timeSpeed;
		}
	}

	private moveSnake() {
		if (this.gameState !== "playing") {
			return;
		}

		const head = { ...this.snake[0] };

		switch (this.snakeDirection) {
			case "up":
				head.y -= 1;
				break;
			case "down":
				head.y += 1;
				break;
			case "left":
				head.x -= 1;
				break;
			case "right":
				head.x += 1;
				break;
		}

		if (head.x < 0 || head.y < 0 || head.x >= this.grid[0].length || head.y >= this.grid.length) {
			this.gameState = "lost";
			return;
		}

		for (const segment of this.snake) {
			if (segment.x === head.x && segment.y === head.y) {
				this.gameState = "lost";
				return;
			}
		}

		this.snake.unshift(head);

		if (head.x === this.food.x && head.y === this.food.y) {
			this.createFood();
		} else {
			this.snake.pop();
		}
	}

	private createFood() {
		let x = -1;
		let y = -1;
		let isFoodPositionAvailable = false;

		do {
			x = Math.floor(Math.random() * this.grid[0].length);
			y = Math.floor(Math.random() * this.grid.length);

			isFoodPositionAvailable = true;

			for (let i = 0; i < this.snake.length; i++) {
				if (this.snake[i].x === x && this.snake[i].y === y) {
					isFoodPositionAvailable = false;
					break;
				}
			}
		} while (!isFoodPositionAvailable);

		this.food.x = x;
		this.food.y = y;
	}
}
