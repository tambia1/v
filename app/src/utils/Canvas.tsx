export const getCanvas = (canvasElement: HTMLCanvasElement | null) => {
	const element = canvasElement?.getContext("2d");
	const canvas = element?.canvas;
	const ctx = canvas?.getContext("2d");

	const resizeObserver = new ResizeObserver((entries) => {
		const rect = entries[0].target;

		console.log(rect);

		// ctx.width = rect.offsetWidth;
		// ctx.height = rect.offsetHeight;
	});

	resizeObserver.observe(canvasElement?.parentElement as Element);

	return ctx;
};

export const hex2rgba = (hexa: string) => {
	const r = Number.parseInt(hexa.slice(1, 3), 16);
	const g = Number.parseInt(hexa.slice(3, 5), 16);
	const b = Number.parseInt(hexa.slice(5, 7), 16);
	const a = Number.parseInt(hexa.slice(7, 9), 16) / 255;

	return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const drawCube = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	wx: number,
	wy: number,
	h: number,
	color1: string,
	color2: string,
	color3: string,
	color4: string,
) => {
	color1 = hex2rgba(color1);
	color2 = hex2rgba(color2);
	color3 = hex2rgba(color3);
	color4 = hex2rgba(color4);

	ctx.save();
	ctx.translate(0.5, 0.5);

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x - wx, y - wx * 0.5);
	ctx.lineTo(x - wx, y - h - wx * 0.5);
	ctx.lineTo(x, y - h * 1);
	ctx.closePath();
	ctx.fillStyle = color1;
	ctx.strokeStyle = color4;
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + wy, y - wy * 0.5);
	ctx.lineTo(x + wy, y - h - wy * 0.5);
	ctx.lineTo(x, y - h * 1);
	ctx.closePath();
	ctx.fillStyle = color2;
	ctx.strokeStyle = color4;
	ctx.stroke();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(x, y - h);
	ctx.lineTo(x - wx, y - h - wx * 0.5);
	ctx.lineTo(x - wx + wy, y - h - (wx * 0.5 + wy * 0.5));
	ctx.lineTo(x + wy, y - h - wy * 0.5);
	ctx.closePath();
	ctx.fillStyle = color3;
	ctx.strokeStyle = color4;
	ctx.stroke();
	ctx.fill();

	ctx.restore();
};
