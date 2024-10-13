import { useCallback, useEffect, useRef } from "react";

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
	const requestRef = useRef<number | null>(null);
	const previousTimeRef = useRef<number | null>(null);

	const run = useCallback(
		(time: number) => {
			if (previousTimeRef.current != null) {
				const deltaTime = time - previousTimeRef.current;
				callback(deltaTime);
			}
			previousTimeRef.current = time;
			requestRef.current = requestAnimationFrame(run);
		},
		[callback],
	);

	useEffect(() => {
		requestRef.current = requestAnimationFrame(run);

		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current);
			}
		};
	}, [run]);
};
