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

	private gameState: "ready" | "playing" | "paused" | "stopped" | "gameOver";

	constructor({ board, onGameOver }: GameProps) {
		this.board = board;
		this.onGameOver = onGameOver;

		this.gameState = "ready";

		this.initCanvas();
		this.initTouches();

		this.resetGame();
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
				if (this.gameState === "ready") {
					const xx = Math.floor(x / (this.canvas.width / this.grid[0].length));
					const yy = Math.floor(y / (this.canvas.height / this.grid.length));

					this.grid[yy][xx] = 1;
				}
			},
		});
	}

	private resetGame() {
		this.gameState = "ready";

		this.grid = Array(20)
			.fill(0)
			.map(() => Array(20).fill(0));

		this.grid[10][10] = 1;
	}

	public start() {
		this.requestAnimationFrameId = window.requestAnimationFrame(this.start.bind(this));

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

	public stop() {
		window.cancelAnimationFrame(this.requestAnimationFrameId);
		this.requestAnimationFrameId = 0;
	}

	private update(_timeDif: number) {
		this.updateGameOver();
	}

	private updateGameOver() {
		this.onGameOver?.();
	}

	private draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		this.drawInit(ctx);
		this.drawGrid(ctx);
		this.drawTime(ctx);
		this.drawGameOver(ctx);

		ctx.restore();
	}

	public destroy() {
		this.stop();
		this.board.removeChild(this.canvas);
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

		ctx.save();

		ctx.font = "bold 16px clashRoyaleFont";
		ctx.fillStyle = "#ffffff";
		ctx.shadowColor = "#000000";
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		ctx.shadowBlur = 3;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		ctx.fillText("Game Over", 270, 250);

		ctx.restore();
	}
}
