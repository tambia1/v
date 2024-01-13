export const UtilsCanvas = {
	rectRound: (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	},

	createImageData: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
		return ctx.createImageData(width, height);
	},

	drawImageData: (ctx: CanvasRenderingContext2D, imageData: ImageData, x: number, y: number) => {
		ctx.putImageData(imageData, x, y);
	},

	putPixel: (ctx: CanvasRenderingContext2D, image: ImageData, x: number, y: number, r: number, g: number, b: number, a: number) => {
		let index = 4 * (ctx.canvas.width * y + x);

		image.data[index + 0] = r;
		image.data[index + 1] = g;
		image.data[index + 2] = b;
		image.data[index + 3] = a;
	},
};
