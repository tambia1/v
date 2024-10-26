export type IXY = {
	x: number;
	y: number;
};

export type IWH = {
	w: number;
	h: number;
};

export type ICircle = {
	x: number;
	y: number;
	r: number;
};

export type IXYWH = IXY & IWH;

export type IXXYYWH = IXY &
	IWH & {
		x1: number;
		x2: number;
		y1: number;
		y2: number;
	};

export type IRect = IXXYYWH & {
	xc: number;
	yc: number;
};
