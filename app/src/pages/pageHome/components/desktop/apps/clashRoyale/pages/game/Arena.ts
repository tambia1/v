import { UtilsImage } from "./UtilsImage";

import imageArena1 from "./images/arenas/arena1.jpg";
import imageArena2 from "./images/arenas/arena2.jpg";
import imageArena3 from "./images/arenas/arena3.jpg";
import imageArena4 from "./images/arenas/arena4.jpg";
import imageArena5 from "./images/arenas/arena5.jpg";
import imageArena6 from "./images/arenas/arena6.jpg";
import imageArena7 from "./images/arenas/arena7.jpg";
import imageArena8 from "./images/arenas/arena8.jpg";
import imageArena9 from "./images/arenas/arena9.jpg";
import imageArena10 from "./images/arenas/arena10.jpg";
import imageArena11 from "./images/arenas/arena11.jpg";

export type IType = "arena1" | "arena2" | "arena3" | "arena4" | "arena5" | "arena6" | "arena7" | "arena8" | "arena9" | "arena10" | "arena11";
type IArena = { image: HTMLImageElement };

const types: { [K in IType]: IArena } = {
	arena1: { image: UtilsImage.getImage(imageArena1) },
	arena2: { image: UtilsImage.getImage(imageArena2) },
	arena3: { image: UtilsImage.getImage(imageArena3) },
	arena4: { image: UtilsImage.getImage(imageArena4) },
	arena5: { image: UtilsImage.getImage(imageArena5) },
	arena6: { image: UtilsImage.getImage(imageArena6) },
	arena7: { image: UtilsImage.getImage(imageArena7) },
	arena8: { image: UtilsImage.getImage(imageArena8) },
	arena9: { image: UtilsImage.getImage(imageArena9) },
	arena10: { image: UtilsImage.getImage(imageArena10) },
	arena11: { image: UtilsImage.getImage(imageArena11) },
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
