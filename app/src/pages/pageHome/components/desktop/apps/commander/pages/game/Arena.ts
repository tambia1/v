import { UtilsImage } from "./core/UtilsImage";
import imageArena1 from "./images/arenas/arena1.webp";
import imageArena2 from "./images/arenas/arena2.webp";
import imageArena3 from "./images/arenas/arena3.webp";

export type ArenaType = "worldWar1" | "worldWar2" | "worldWar3";

const types: { [K in ArenaType]: { image: HTMLImageElement } } = {
	worldWar1: { image: UtilsImage.getImage(imageArena1) },
	worldWar2: { image: UtilsImage.getImage(imageArena2) },
	worldWar3: { image: UtilsImage.getImage(imageArena3) },
};

export class Arena {
	private type: ArenaType = "worldWar1";
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
