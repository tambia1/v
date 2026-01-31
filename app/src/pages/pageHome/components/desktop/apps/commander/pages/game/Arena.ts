import { UtilsImage } from "./core/UtilsImage";
import imageArena1 from "./images/arenas/arena1.webp";
import imageArena2 from "./images/arenas/arena2.webp";
import imageArena3 from "./images/arenas/arena3.webp";

export type ArenaName = "worldWar1" | "worldWar2" | "worldWar3";
type ArenaData = { image: HTMLImageElement };

const types: { [K in ArenaName]: ArenaData } = {
	worldWar1: { image: UtilsImage.getImage(imageArena1) },
	worldWar2: { image: UtilsImage.getImage(imageArena2) },
	worldWar3: { image: UtilsImage.getImage(imageArena3) },
};

export class Arena {
	private name: ArenaName = "worldWar1";
	private image: HTMLImageElement = types[this.name].image;

	constructor(type: ArenaName) {
		this.setType(type);
	}

	public setType(type: ArenaName): void {
		this.name = type;
		this.image = types[this.name].image;
	}

	public drawImage(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.drawImage(this.image, 0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.restore();
	}
}
