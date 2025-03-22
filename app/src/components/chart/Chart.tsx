import { useTheme } from "styled-components";
import { Canvas } from "../canvas/Canvas";
import type { XY } from "../canvas/Canvas.types";
import * as C from "../canvas/Canvas.utils";
import * as S from "./Chart.styles";

export type Line = {
	color: string;
	data: number[][];
};

interface Props {
	className?: string;
	lines: Line[];
}

export const Chart = ({ className, lines }: Props) => {
	const theme = useTheme();

	const draw = (ctx: CanvasRenderingContext2D) => {
		const w = ctx.canvas.width;
		const h = ctx.canvas.height;

		const axisX: XY[] = [
			{ x: 0, y: h },
			{ x: w, y: h },
		];

		C.drawLines(ctx, axisX, "#000000");

		for (let i = 0; i < w; i += 100) {
			const points: XY[] = [
				{ x: i, y: 0 },
				{ x: i, y: h },
			];

			C.drawLines(ctx, points, "#000000");
		}

		for (let i = 1; i < w; i += 100) {
			const points: XY[] = [
				{ x: 0, y: h - i },
				{ x: w, y: h - i },
			];

			C.drawLines(ctx, points, "#000000");
		}

		C.drawLines(
			ctx,
			[
				{ x: 0, y: 0 },
				{ x: w, y: 0 },
			],
			"#000000",
		);

		for (let i = 0; i < lines.length; i++) {
			const minValue = Math.min(...lines[i].data.map((item) => item[1]));
			const maxValue = Math.max(...lines[i].data.map((item) => item[1]));
			const r = h / (maxValue - minValue);

			const points: XY[] = [];

			for (let j = 0; j < lines[i].data.length; j++) {
				points.push({ x: j * (w / (lines[i].data.length - 1)), y: h - (lines[i].data[j][1] - minValue) * r });
			}

			const grd = ctx.createLinearGradient(0, -h / 2, 0, h);
			grd.addColorStop(0, lines[i].color);
			grd.addColorStop(1, "transparent");

			ctx.save();
			ctx.fillStyle = grd;
			ctx.strokeStyle = "transparent";
			ctx.beginPath();
			ctx.moveTo(points[0].x, points[0].y);

			for (let i = 1; i < points.length; i++) {
				ctx.lineTo(points[i].x, points[i].y);
			}

			ctx.lineTo(points.at(-1)?.x || 0, h);
			ctx.lineTo(0, h);

			ctx.closePath();
			ctx.stroke();
			ctx.fill();
			ctx.restore();

			C.drawLines(ctx, points, lines[i].color);
		}

		const minValue = Math.min(...lines[0].data.map((item) => item[1]));
		const maxValue = Math.max(...lines[0].data.map((item) => item[1]));

		C.drawText(ctx, maxValue.toFixed(3).toString(), w - 50, 5, { textBaseline: "top", fillStyle: theme.color.primaryFgEnabled });
		C.drawText(ctx, minValue.toFixed(3).toString(), w - 50, h - 5, { textBaseline: "bottom", fillStyle: theme.color.primaryFgEnabled });
	};

	return (
		<S.Container className={className}>
			<Canvas draw={draw} />
		</S.Container>
	);
};
