import { UtilsImage } from "./UtilsImage";

export type IType = "arena1" | "arena2" | "arena3" | "arena4" | "arena5" | "arena6" | "arena7" | "arena8" | "arena9" | "arena10" | "arena11";
type IArena = { image: HTMLImageElement };

const types: { [K in IType]: IArena } = {
	arena1: { image: UtilsImage.getImage("./images/arenas/arena1.jpg") },
	arena2: { image: UtilsImage.getImage("./images/arenas/arena2.jpg") },
	arena3: { image: UtilsImage.getImage("./images/arenas/arena3.jpg") },
	arena4: { image: UtilsImage.getImage("./images/arenas/arena4.jpg") },
	arena5: { image: UtilsImage.getImage("./images/arenas/arena5.jpg") },
	arena6: { image: UtilsImage.getImage("./images/arenas/arena6.jpg") },
	arena7: { image: UtilsImage.getImage("./images/arenas/arena7.jpg") },
	arena8: { image: UtilsImage.getImage("./images/arenas/arena8.jpg") },
	arena9: { image: UtilsImage.getImage("./images/arenas/arena9.jpg") },
	arena10: { image: UtilsImage.getImage("./images/arenas/arena10.jpg") },
	arena11: { image: UtilsImage.getImage("./images/arenas/arena11.jpg") },
};

export class Arena {
	private type: IType = "arena1";
	private image: HTMLImageElement = types[this.type].image;

	constructor(type: IType) {
		this.setType(type);
	}

	public setType(type: IType): void {
		this.type = type;
		this.image = types[this.type].image;
	}

	public drawImage(ctx: CanvasRenderingContext2D): void {
		ctx.save();
		ctx.drawImage(this.image, 0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.restore();
	}
}
