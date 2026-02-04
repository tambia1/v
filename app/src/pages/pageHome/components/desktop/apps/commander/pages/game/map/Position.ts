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
	public isPressed: boolean;
	public isSelected: boolean;

	constructor({ x = 0, y = 0, w = 0, h = 0 }: PositionParams = {}) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.isPressed = false;
		this.isSelected = false;
	}

	public setXY(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public setWH(w: number, h: number) {
		this.w = w;
		this.h = h;
	}

	public getX() {
		return this.x;
	}

	public getY() {
		return this.y;
	}

	public getW() {
		return this.w;
	}

	public getH() {
		return this.h;
	}

	public getCenterX() {
		return this.x + this.w / 2;
	}

	public getCenterY() {
		return this.y + this.h / 2;
	}

	public setIsPressed(isPressed: boolean) {
		this.isPressed = isPressed;
	}

	public getIsPressed() {
		return this.isPressed;
	}

	public setIsSelected(isSelected: boolean) {
		this.isSelected = isSelected;
	}

	public getIsSelected() {
		return this.isSelected;
	}

	public distanceTo(other: Position) {
		const dx = this.getCenterX() - other.getCenterX();
		const dy = this.getCenterY() - other.getCenterY();
		return Math.sqrt(dx * dx + dy * dy);
	}

	public contains(x: number, y: number) {
		return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
	}

	public overlaps(other: { x: number; y: number; w: number; h: number }) {
		return !(this.x + this.w < other.x || other.x + other.w < this.x || this.y + this.h < other.y || other.y + other.h < this.y);
	}
}
