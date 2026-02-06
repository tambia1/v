type PositionParams = {
	x?: number;
	y?: number;
	w?: number;
	h?: number;
};

export class Position {
	public x: number;
	public y: number;
	public w: number;
	public h: number;

	constructor({ x = 0, y = 0, w = 0, h = 0 }: PositionParams = {}) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	public getCenterX() {
		return this.x + this.w / 2;
	}

	public getCenterY() {
		return this.y + this.h / 2;
	}

	public distanceTo(other: Position) {
		const dx = this.getCenterX() - other.getCenterX();
		const dy = this.getCenterY() - other.getCenterY();
		return Math.sqrt(dx * dx + dy * dy);
	}

	public isContains(x: number, y: number) {
		return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
	}

	public isOverlaps(other: { x: number; y: number; w: number; h: number }) {
		return !(this.x + this.w < other.x || other.x + other.w < this.x || this.y + this.h < other.y || other.y + other.h < this.y);
	}
}
