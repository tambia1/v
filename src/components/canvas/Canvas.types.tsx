export interface IXY {
	x: number;
	y: number;
}

export interface IWH {
	w: number;
	h: number;
}

export interface ICircle {
	x: number;
	y: number;
	r: number;
}

export interface IXYWH extends IXY, IWH {}

export interface IXXYYWH extends IXY, IWH {
	x1: number;
	x2: number;
	y1: number;
	y2: number;
}

export interface IRect extends IXXYYWH {
	xc: number;
	yc: number;
}
