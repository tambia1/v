type EngineProps = {
	onUpdate: (timeDif: number) => void;
};

export class GameEngine {
	private requestAnimationFrameId = 0;

	private timeOld = 0;
	private timeNow = 0;
	private timeDif = 0;

	private onUpdate: (timeDif: number) => void;

	constructor({ onUpdate }: EngineProps) {
		this.onUpdate = onUpdate;
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

		this.onUpdate(this.timeDif);
	}

	public stop() {
		window.cancelAnimationFrame(this.requestAnimationFrameId);
	}
}
