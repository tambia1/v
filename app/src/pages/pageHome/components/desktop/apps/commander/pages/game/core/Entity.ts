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
	public state: State;

	constructor(params: EntityParams = {}) {
		this.name = params.name || "";
		this.image = params.image || UtilsImage.getImage("");
		this.position = params.position || new Position();
		this.state = params.state || new State({ isSelected: false });
	}

	public abstract update(timeDif: number): void;
	public abstract draw(ctx: CanvasRenderingContext2D): void;
}
