import Utils from "./Utils";

type IType = keyof typeof Arena.types;

export class Arena {
	public type: IType;

	public static types = {
		arena1: { image: Utils.getImage("./images/arenas/arena1.jpg") },
		arena2: { image: Utils.getImage("./images/arenas/arena2.jpg") },
		arena3: { image: Utils.getImage("./images/arenas/arena3.jpg") },
		arena4: { image: Utils.getImage("./images/arenas/arena4.jpg") },
		arena5: { image: Utils.getImage("./images/arenas/arena5.jpg") },
		arena6: { image: Utils.getImage("./images/arenas/arena6.jpg") },
		arena7: { image: Utils.getImage("./images/arenas/arena7.jpg") },
		arena8: { image: Utils.getImage("./images/arenas/arena8.jpg") },
		arena9: { image: Utils.getImage("./images/arenas/arena9.jpg") },
		arena10: { image: Utils.getImage("./images/arenas/arena10.jpg") },
		arena11: { image: Utils.getImage("./images/arenas/arena11.jpg") },
	};

	constructor(type: IType) {
		this.type = type;
	}

	public drawImage(ctx: CanvasRenderingContext2D): void {
		if (Arena.types[this.type].image) {
			return;
		}

		ctx.save();
		ctx.drawImage(Arena.types[this.type].image, 0, 0, ctx.canvas.offsetWidth, ctx.canvas.offsetHeight);
		ctx.restore();
	}
}
