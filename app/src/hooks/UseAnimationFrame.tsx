import { useCallback, useEffect, useRef } from "react";

export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
	const refRequest = useRef<number>(0);
	const refTime = useRef<number>(0);
	const fps = 60;

	const run = useCallback(() => {
		const timeOld = refTime.current || performance.now();
		const timeNow = performance.now();
		const timeDif = timeNow - timeOld;

		if (timeDif < 1000 / fps) {
			return;
		}

		refTime.current = timeNow;

		callback(timeDif);

		refRequest.current = requestAnimationFrame(run);
	}, [callback]);

	useEffect(() => {
		refRequest.current = requestAnimationFrame(run);

		return () => {
			if (refRequest.current) {
				cancelAnimationFrame(refRequest.current);
			}
		};
	}, [run]);
};
