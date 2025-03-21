export type XY = {
	x: number;
	y: number;
};

export type WH = {
	w: number;
	h: number;
};

export type Circle = {
	x: number;
	y: number;
	r: number;
};

export type XYWH = XY & WH;

export type XXYYWH = XY &
	WH & {
		x1: number;
		x2: number;
		y1: number;
		y2: number;
	};

export type Rect = XXYYWH & {
	xc: number;
	yc: number;
};
