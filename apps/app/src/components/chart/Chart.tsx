import { Canvas } from "../canvas/Canvas";
import { IXY } from "../canvas/Canvas.types";
import * as C from "../canvas/Canvas.utils";
import * as S from "./Chart.styles";

interface Props {
	data: number[][];
}

export const Chart = ({ data }: Props) => {
	const draw = (ctx: CanvasRenderingContext2D) => {
		const w = ctx.canvas.width;
		const h = ctx.canvas.height;
		const g = 20;

		const minValue = Math.min(...data.map((item) => item[1]));
		const maxValue = Math.max(...data.map((item) => item[1]));
		const r = (h - g) / (maxValue - minValue);

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

		const points: IXY[] = [];
		for (let i = 0; i < data.length; i++) {
			points.push({ x: g + i * (w / data.length), y: h - (data[i][1] - minValue) * r - g });
		}

		C.drawLines(ctx, points, "#5dee2d");

		C.drawGradient(ctx, 0, h, w, 0);
	};

	return (
		<S.Container>
			<Canvas draw={draw} deps={data} />
		</S.Container>
	);
};
