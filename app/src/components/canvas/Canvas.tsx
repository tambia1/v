import { DependencyList, useCallback, useEffect, useRef } from "react";

interface Props {
	className?: string | undefined;
	draw: (ctx: CanvasRenderingContext2D) => void;
	deps?: DependencyList | undefined;
}

export const Canvas = ({ className, draw, deps }: Props) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleOnResize = useCallback(
		(entries: ResizeObserverEntry[]) => {
			if (!canvasRef.current) {
				return;
			}

			const canvas = canvasRef.current!;
			const ctx = canvas.getContext("2d")!;

			canvas.width = entries[0].contentRect.width;
			canvas.height = entries[0].contentRect.height;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.scale(1, 1);
			ctx.translate(0.5, 0.5);
			ctx.lineWidth = 1;

			ctx.save();

			draw(ctx);

			ctx.restore();
		},
		[draw, deps]
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

	return <canvas className={className} ref={canvasRef} width={100} height={100} />;
};
