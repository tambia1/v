type ResearchParams = {
	name: string;
	timeToResearch: number;
};

export abstract class Research {
	protected name: string;
	protected timeToResearch: number;

	constructor(params: ResearchParams) {
		this.name = params.name;
		this.timeToResearch = params.timeToResearch;
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
