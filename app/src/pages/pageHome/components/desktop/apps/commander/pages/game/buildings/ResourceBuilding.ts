type ResourceBuildingParams = {
	amount: number;
	producedPerDay: number;
};

export abstract class ResourceBuilding {
	protected amount: number;
	protected producedPerDay: number;
	protected x: number;
	protected y: number;
	protected w: number;
	protected h: number;

	constructor(params: ResourceBuildingParams) {
		this.amount = params.amount;
		this.producedPerDay = params.producedPerDay;

		this.x = 0;
		this.y = 0;
		this.w = 0;
		this.h = 0;
	}

	public getAmount() {
		return this.amount;
	}

	public setAmount(amount: number) {
		this.amount = amount;
	}

	public getProducedPerDay() {
		return this.producedPerDay;
	}

	public setProducedPerDay(amount: number) {
		this.producedPerDay = amount;
	}

	public add(amount: number) {
		this.amount += amount;
	}

	public remove(amount: number) {
		this.amount -= amount;
	}

	public update(timeDif: number) {
		this.amount += (timeDif / 1000) * (this.producedPerDay / 24 / 60 / 60);
	}

	public setXY(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public setWH(w: number, h: number) {
		this.w = w;
		this.h = h;
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
