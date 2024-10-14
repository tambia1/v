import { useCallback, useRef } from "react";

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
	const refRequest = useRef<number>(0);
	const refTime = useRef<number>(performance.now());
	const fps = 60;

	const run = useCallback(() => {
		refRequest.current = requestAnimationFrame(run);

		const timeOld = refTime.current;
		const timeNow = performance.now();
		const timeDif = timeNow - timeOld;

		if (timeDif < 1000 / fps) {
			return;
		}

		refTime.current = timeNow;
		callback(timeDif);
	}, [callback]);

	const start = useCallback(() => {
		refRequest.current = requestAnimationFrame(run);
	}, [run]);

	const stop = useCallback(() => {
		if (refRequest.current) {
			cancelAnimationFrame(refRequest.current);
		}
	}, []);

	return {
		start,
		stop,
	};
};
