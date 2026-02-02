type ResearchParams = {
	timeToResearch: number;
};

export abstract class Research {
	protected timeToResearch: number;
	protected x: number;
	protected y: number;
	protected w: number;
	protected h: number;

	constructor(params: ResearchParams) {
		this.timeToResearch = params.timeToResearch;

		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
	}

	public getTimeToResearch() {
		return this.timeToResearch;
	}

	public setXY(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public setWH(w: number, h: number) {
		this.w = w;
		this.h = h;
	}

	public abstract getName(): string;

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}

export type { ResearchParams };
