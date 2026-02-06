import { UtilsImage } from "../core/UtilsImage";
import { Position } from "../map/Position";

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

	public name: string;
	public image: HTMLImageElement;

	public isSelected: boolean;

	constructor(params: ResourceBuildingParams) {
		this.amount = params.amount;
		this.producedSecond = params.producedPerSecond;
		this.position = new Position({ x: params.x, y: params.y, w: 1, h: 1 });

		this.name = "";
		this.image = UtilsImage.getImage("");
		this.isSelected = false;
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

	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
