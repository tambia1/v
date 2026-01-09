import imageArena1 from "./images/arenas/arena1.jpg";
import imageArena2 from "./images/arenas/arena2.jpg";
import imageArena3 from "./images/arenas/arena3.jpg";
import { UtilsImage } from "./UtilsImage";

export type ArenaType = "arena1" | "arena2" | "arena3";
type ArenaData = { image: HTMLImageElement };

const types: { [K in ArenaType]: ArenaData } = {
	arena1: { image: UtilsImage.getImage(imageArena1) },
	arena2: { image: UtilsImage.getImage(imageArena2) },
	arena3: { image: UtilsImage.getImage(imageArena3) },
};

export class Arena {
	private type: ArenaType = "arena1";
	private image: HTMLImageElement = types[this.type].image;

	constructor(type: ArenaType) {
		this.setType(type);
	}

	public setType(type: ArenaType): void {
		this.type = type;
		this.image = types[this.type].image;
	}

	public drawImage(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.drawImage(this.image, 0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.restore();
	}
}
