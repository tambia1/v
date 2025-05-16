import { UtilsCanvas } from "./UtilsCanvas";
import { UtilsTouch } from "./UtilsTouch";

type GameProps = {
	board: HTMLElement;
	onGameOver: () => void;
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
	private timeAcc!: number;

	private gameState!: "ready" | "playing" | "paused" | "stopped" | "gameOver";
	private snakeDirection!: "up" | "down" | "left" | "right";
	private snakePosition!: { x: number; y: number };

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

		const dpr = window.devicePixelRatio || 1;

		this.canvas.width = this.board.offsetWidth * dpr;
		this.canvas.height = this.board.offsetHeight * dpr;

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
					if (yy > this.snakePosition.y) {
						this.snakeDirection = "down";
					} else if (yy < this.snakePosition.y) {
						this.snakeDirection = "up";
					}
				} else if (this.snakeDirection === "up" || this.snakeDirection === "down") {
					if (xx > this.snakePosition.x) {
						this.snakeDirection = "right";
					} else if (xx < this.snakePosition.x) {
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

	private reset() {
		this.grid = Array(20)
			.fill(0)
			.map(() => Array(20).fill(0));

		this.snakeDirection = "right";
		this.snakePosition = { x: 10, y: 10 };

		this.grid[this.snakePosition.y][this.snakePosition.y] = 1;

		this.timeAcc = 0;
		this.gameState = "ready";
	}

	public start() {
		this.gameState = "playing";
	}

	public stop() {
		this.gameState = "stopped";
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
		this.drawTime(ctx);
		this.drawGameOver(ctx);

		ctx.restore();
	}

	private update(timeDif: number) {
		this.updateSnake(timeDif);
		this.updateGameOver();
	}

	private drawInit(ctx: CanvasRenderingContext2D) {
		const dpr = window.devicePixelRatio || 1;
		ctx.scale(dpr, dpr);

		ctx.clearRect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.scale(1, 1);
		ctx.translate(0.5, 0.5);

		ctx.beginPath();
		ctx.rect(0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.clip();
	}

	private drawGrid(ctx: CanvasRenderingContext2D) {
		const w = ctx.canvas.width / this.grid[0].length;
		const h = ctx.canvas.height / this.grid.length;

		for (let i = 0; i < this.grid.length; i++) {
			for (let j = 0, c = i; j < this.grid[i].length; j++, c++) {
				const x = j * w;
				const y = i * h;

				if (this.grid[i][j] === 0) {
					if (c % 2 === 0) {
						ctx.fillStyle = "#ddddff";
					} else {
						ctx.fillStyle = "#aaaaff";
					}
				} else {
					ctx.fillStyle = "#ff0000";
				}

				ctx.fillRect(x, y, w, h);
			}
		}
	}

	private drawTime(ctx: CanvasRenderingContext2D) {
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

		const timeText = `Time: ${Math.floor(this.timeNow / 1000)}`;

		ctx.fillText(timeText, x + w / 2, y + h / 2);

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
		this.onGameOver?.();
	}

	private updateSnake(timeDif: number) {
		this.timeAcc += timeDif;

		while (this.timeAcc >= 1000) {
			this.moveSnake();
			this.timeAcc -= 1000;
		}
	}

	private moveSnake() {
		if (this.gameState !== "playing") {
			return;
		}

		this.grid[this.snakePosition.y][this.snakePosition.x] = 0;

		switch (this.snakeDirection) {
			case "up":
				this.snakePosition.y -= 1;
				break;
			case "down":
				this.snakePosition.y += 1;
				break;
			case "left":
				this.snakePosition.x -= 1;
				break;
			case "right":
				this.snakePosition.x += 1;
				break;
		}

		if (this.snakePosition.x < 0 || this.snakePosition.x >= this.grid[0].length || this.snakePosition.y < 0 || this.snakePosition.y >= this.grid.length) {
			this.gameState = "gameOver";

			this.snakePosition.x = Math.min(this.snakePosition.x, this.grid[0].length - 1);
			this.snakePosition.y = Math.min(this.snakePosition.y, this.grid.length - 1);
			this.snakePosition.x = Math.max(this.snakePosition.x, 0);
			this.snakePosition.y = Math.max(this.snakePosition.y, 0);
			return;
		}

		this.grid[this.snakePosition.y][this.snakePosition.x] = 1;
	}
}
