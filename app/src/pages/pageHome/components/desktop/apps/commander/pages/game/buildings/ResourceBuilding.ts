import { Position } from "../map/Position";

type ResourceBuildingParams = {
	amount: number;
	producedPerDay: number;
	x: number;
	y: number;
};

export abstract class ResourceBuilding {
	protected amount: number;
	protected producedPerDay: number;
	protected position: Position;

	constructor(params: ResourceBuildingParams) {
		this.amount = params.amount;
		this.producedPerDay = params.producedPerDay;
		this.position = new Position({ x: params.x, y: params.y, w: 1, h: 1 });
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

	public getPosition(): Position {
		return this.position;
	}

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
