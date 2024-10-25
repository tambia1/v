import { type HTMLAttributes, useCallback, useEffect, useRef } from "react";

export type Props = HTMLAttributes<HTMLCanvasElement> & {
	className?: string;
	draw: (ctx: CanvasRenderingContext2D) => void;
};

export const Canvas = ({ className, draw, ...rest }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleOnResize = useCallback(() => {
		if (!canvasRef.current) {
			return;
		}

		const canvas = canvasRef.current;

		if (!canvas) {
			return;
		}

		const ctx = canvas.getContext("2d");

		if (!ctx) {
			return;
		}

		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.scale(1, 1);
		ctx.translate(0, 0);
		ctx.lineWidth = 1;

		ctx.save();

		draw(ctx);

		ctx.restore();
	}, [draw]);

	useEffect(() => {
		const parent = canvasRef.current?.parentElement;

		if (!parent) {
			return;
		}

		const resizeObserver = new ResizeObserver(handleOnResize);

		resizeObserver.observe(parent);

		return () => {
			if (canvasRef.current) {
				resizeObserver.unobserve(parent);
			}
		};
	}, [handleOnResize]);

	return <canvas className={className} ref={canvasRef} width={100} height={100} {...rest} />;
};
