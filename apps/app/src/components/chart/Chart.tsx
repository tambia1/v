import { Canvas } from "../canvas/Canvas";
import { IXY } from "../canvas/Canvas.types";
import * as C from "../canvas/Canvas.utils";
import * as S from "./Chart.styles";

export type ILine = {
	color: string;
	data: number[][];
};

interface Props {
	lines: ILine[];
}

export const Chart = ({ lines }: Props) => {
	const draw = (ctx: CanvasRenderingContext2D) => {
		const w = ctx.canvas.width;
		const h = ctx.canvas.height;
		const g = 20;

		const axisX: IXY[] = [
			{ x: 0, y: h - g },
			{ x: w, y: h - g },
		];

		const axisY: IXY[] = [
			{ x: g, y: 0 },
			{ x: g, y: h },
		];

		C.drawLines(ctx, axisX, "#000000");
		C.drawLines(ctx, axisY, "#000000");

		for (let i = 100; i < w; i += 100) {
			const points: IXY[] = [
				{ x: g + i, y: 0 },
				{ x: g + i, y: h },
			];

			C.drawLines(ctx, points, "#999999");
		}

		for (let i = 100; i < w; i += 100) {
			const points: IXY[] = [
				{ x: 0, y: h - g - i },
				{ x: w, y: h - g - i },
			];

			C.drawLines(ctx, points, "#999999");
		}

		for (let i = 0; i < lines.length; i++) {
			const minValue = Math.min(...lines[i].data.map((item) => item[1]));
			const maxValue = Math.max(...lines[i].data.map((item) => item[1]));
			const r = (h - g) / (maxValue - minValue);

			const points: IXY[] = [];

			for (let j = 0; j < lines[i].data.length; j++) {
				points.push({ x: g + j * (w / lines[i].data.length), y: h - (lines[i].data[j][1] - minValue) * r - g });
			}

			C.drawLines(ctx, points, lines[i].color);
		}

		const minValue = Math.min(...lines[0].data.map((item) => item[1]));
		const maxValue = Math.max(...lines[0].data.map((item) => item[1]));

		C.drawText(ctx, maxValue.toFixed(3).toString(), w - g - 50, g);
		C.drawText(ctx, minValue.toFixed(3).toString(), w - g - 50, h - g);
	};

	return (
		<S.Container>
			<Canvas draw={draw} deps={lines} />
		</S.Container>
	);
};
