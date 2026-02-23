export interface Drawable {
	image: HTMLImageElement;

	draw(ctx: CanvasRenderingContext2D): void;
}
