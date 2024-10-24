import { useCallback, useEffect, useRef } from "react";

interface Props {
	className?: string;
	draw: (ctx: CanvasRenderingContext2D) => void;
}

export const Canvas = ({ className, draw }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleOnResize = useCallback(
		(entries: ResizeObserverEntry[]) => {
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

			canvas.width = entries[0].contentRect.width;
			canvas.height = entries[0].contentRect.height;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.scale(1, 1);
			ctx.translate(0, 0);
			ctx.lineWidth = 1;

			ctx.save();

			draw(ctx);

			ctx.restore();
		},
		[draw],
	);

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

	return <canvas className={className} ref={canvasRef} width={100} height={100} />;
};
