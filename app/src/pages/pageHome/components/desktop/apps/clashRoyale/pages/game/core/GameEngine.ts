type EngineProps = {
	div: HTMLDivElement;
	onStart: ({ ctx, timeDif }: OnStartProps) => void;
	onUpdate: ({ ctx, timeDif }: OnUpdateProps) => void;
};

type OnStartProps = {
	ctx: CanvasRenderingContext2D;
	timeDif: number;
};

type OnUpdateProps = {
	ctx: CanvasRenderingContext2D;
	timeDif: number;
};

export class GameEngine {
	private requestAnimationFrameId = 0;

	private timeOld = 0;
	private timeNow = 0;
	private timeDif = 0;

	private div: HTMLDivElement;
	private ctx: CanvasRenderingContext2D;
	private onUpdate: ({ ctx, timeDif }: OnUpdateProps) => void;

	constructor({ div, onStart, onUpdate }: EngineProps) {
		this.div = div;
		this.onUpdate = onUpdate;

		const canvas = document.createElement("canvas");
		this.div.innerHTML = "";
		this.div.appendChild(canvas);

		const dpr = window.devicePixelRatio || 1;
		canvas.width = div.offsetWidth * dpr;
		canvas.height = div.offsetHeight * dpr;

		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

		onStart({ ctx: this.ctx, timeDif: 0 });
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

		this.onUpdate({ ctx: this.ctx, timeDif: this.timeDif });
	}

	public stop() {
		window.cancelAnimationFrame(this.requestAnimationFrameId);
	}
}
