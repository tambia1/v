import { Position } from "../map/Position";
import { Selectable } from "../map/Selectable";

type ResourceBuildingParams = {
	amount: number;
	producedPerSecond: number;
	x: number;
	y: number;
};

export abstract class ResourceBuilding {
	protected amount: number;
	protected producedSecond: number;
	protected position: Position;
	protected selectable: Selectable;

	constructor(params: ResourceBuildingParams) {
		this.amount = params.amount;
		this.producedSecond = params.producedPerSecond;
		this.position = new Position({ x: params.x, y: params.y, w: 1, h: 1 });
		this.selectable = new Selectable();
	}

	public getAmount() {
		return this.amount;
	}

	public setAmount(amount: number) {
		this.amount = amount;
	}

	public getProducedPerSecond() {
		return this.producedSecond;
	}

	public setProducedPerSecond(amount: number) {
		this.producedSecond = amount;
	}

	public add(amount: number) {
		this.amount += amount;
	}

	public remove(amount: number) {
		this.amount -= amount;
	}

	public update(timeDif: number) {
		this.amount += (timeDif / 1000) * this.producedSecond;
	}

	public getPosition(): Position {
		return this.position;
	}

	public getSelectable(): Selectable {
		return this.selectable;
	}

	public setIsSelected(isSelected: boolean) {
		this.selectable.setIsSelected(isSelected);
	}

	public getIsSelected() {
		return this.selectable.getIsSelected();
	}

	public abstract getName(): string;
	public abstract getImage(): HTMLImageElement;
	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
