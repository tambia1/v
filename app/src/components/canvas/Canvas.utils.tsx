import type { IXY } from "./Canvas.types";

export const reverseYAxis = (ctx: CanvasRenderingContext2D) => {
	ctx.scale(1, -1);
	ctx.translate(0.0, -ctx.canvas.height);
};

export const drawLines = (ctx: CanvasRenderingContext2D, points: IXY[], strokeStyle: string) => {
	if (points.length < 2) {
		return;
	}

	ctx.save();
	ctx.strokeStyle = strokeStyle;

	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);

	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}

	ctx.stroke();

	ctx.restore();
};

export const fillLines = (ctx: CanvasRenderingContext2D, points: IXY[], strokeStyle: string, fillStyle: string) => {
	if (points.length < 2) {
		return;
	}

	ctx.save();
	ctx.strokeStyle = strokeStyle;
	ctx.fillStyle = fillStyle;

	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y);

	for (let i = 1; i < points.length; i++) {
		ctx.lineTo(points[i].x, points[i].y);
	}

	ctx.closePath();

	ctx.stroke();
	ctx.fill();

	ctx.restore();
};

export const drawCircles = (ctx: CanvasRenderingContext2D, points: IXY[], radius: number, strokeStyle: string, fillStyle: string) => {
	ctx.save();

	ctx.strokeStyle = strokeStyle;
	ctx.fillStyle = fillStyle;

	points.forEach((point) => {
		ctx.beginPath();
		ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	});

	ctx.restore();
};

export const drawArc = (ctx: CanvasRenderingContext2D, start: IXY, end: IXY, strokeStyle: string) => {
	ctx.save();

	ctx.strokeStyle = strokeStyle;

	ctx.moveTo(start.x, start.y);
	ctx.quadraticCurveTo((start.x + end.x) / 2, (start.y - end.y) / 2, end.x, end.y);
	ctx.stroke();

	ctx.restore();
};

export const drawText = (
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	options?: {
		fillStyle?: string | CanvasGradient | CanvasPattern;
		shadow?: string;
		shadowOffsetX?: number;
		shadowOffsetY?: number;
		shadowBlur?: number;
		textAlign?: CanvasTextAlign;
		textBaseline?: CanvasTextBaseline;
	},
) => {
	ctx.save();

	ctx.font = "bold 12px Helvetica";
	ctx.fillStyle = options?.fillStyle || "#000000";
	ctx.shadowColor = options?.shadow || "transparent";
	ctx.shadowOffsetX = options?.shadowOffsetX || 0;
	ctx.shadowOffsetY = options?.shadowOffsetY || 0;
	ctx.shadowBlur = options?.shadowBlur || 0;
	ctx.textAlign = options?.textAlign || "start";
	ctx.textBaseline = options?.textBaseline || "bottom";

	ctx.fillText(text, x, y);

	ctx.restore();
};

export const drawGradient = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
	ctx.save();

	const grd = ctx.createLinearGradient(0, 0, 0, h);
	grd.addColorStop(0, "#00ff00");
	grd.addColorStop(1, "transparent");

	ctx.fillStyle = grd;
	ctx.fillRect(x, y, w, h);

	ctx.restore();
};

export const drawRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fillStyle: string) => {
	ctx.save();

	ctx.fillStyle = getColor(fillStyle);
	ctx.fillRect(x, y, w, h);

	ctx.restore();
};

export const getColor = (color: string) => {
	return color.startsWith("#") ? getRgba(color) : color;
};

export const getRgba = (hexa: string) => {
	const r = Number.parseInt(hexa.slice(1, 3), 16);
	const g = Number.parseInt(hexa.slice(3, 5), 16);
	const b = Number.parseInt(hexa.slice(5, 7), 16);
	const a = Number.parseInt(hexa.slice(7, 9) || "ff", 16) / 255;

	return `rgba(${r}, ${g}, ${b}, ${a})`;
};
