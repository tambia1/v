import { UtilsImage } from "../utils/UtilsImage";
import { Position } from "./Position";
import { State } from "./State";

type EntityParams = {
	name?: string;
	image?: HTMLImageElement;
	position?: Position;
	state?: State;
};

export abstract class Entity {
	public name: string;
	public image: HTMLImageElement;
	public position: Position;
	protected state: State;

	constructor(params: EntityParams = {}) {
		this.name = params.name || "";
		this.image = params.image || UtilsImage.getImage("");
		this.position = params.position || new Position();
		this.state = params.state || new State({ isSelected: false, isHovered: false });
	}

	public abstract setIsSelected(value: boolean): void;
	public abstract getIsSelected(): boolean;
	public abstract setIsHovered(value: boolean): void;
	public abstract getIsHovered(): boolean;

	public abstract update(timeDif: number): void;
	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
