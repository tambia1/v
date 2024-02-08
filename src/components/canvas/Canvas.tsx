import { useCallback, useEffect, useRef } from "react";
import { IXY } from "./Canvas.types";

interface Props {
	draw: (ctx: CanvasRenderingContext2D) => void;
}

export const Canvas = ({ draw }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleOnResize = useCallback(
		(entries: ResizeObserverEntry[]) => {
			if (!canvasRef.current) {
				return;
			}

			const canvas = canvasRef.current!;
			const ctx = canvas.getContext("2d")!;

			canvas.width = entries[0].contentRect.width;
			canvas.height = entries[0].contentRect.height - 5;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.scale(1, 1);
			ctx.translate(0.0, 0.0);
			ctx.lineWidth = 1;

			ctx.save();

			draw(ctx);

			ctx.restore();
		},
		[draw]
	);

	useEffect(() => {
		const parent = canvasRef.current!.parentElement!;
		const resizeObserver = new ResizeObserver(handleOnResize);

		resizeObserver.observe(parent);

		return () => {
			if (canvasRef.current) {
				resizeObserver.unobserve(parent);
			}
		};
	}, [handleOnResize]);

	return <canvas ref={canvasRef} width={100} height={100} />;
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
