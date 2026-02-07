type ResearchParams = {
	name: string;
	image: HTMLImageElement;
	timeToResearch: number;
};

export abstract class Research {
	public name: string;
	public image: HTMLImageElement;
	public timeToResearch: number;

	constructor(params: ResearchParams) {
		this.name = params.name;
		this.image = params.image;
		this.timeToResearch = params.timeToResearch;
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
