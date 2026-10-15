import { useCallback, useEffect, useRef, useState } from "react";

export const useAnimationFrame = () => {
	const refRequest = useRef<number>(0);
	const refTime = useRef<number>(performance.now());
	const fps = 60;
	const [time, setTime] = useState({ now: 0, delta: 0 });

	const run = useCallback(() => {
		refRequest.current = requestAnimationFrame(run);

		const timeOld = refTime.current;
		const timeNow = performance.now();
		const timeDif = timeNow - timeOld;

		if (timeDif < 1000 / fps) {
			return;
		}

		refTime.current = timeNow;
		setTime({ now: timeNow, delta: timeDif });
	}, []);

	useEffect(() => {
		refRequest.current = requestAnimationFrame(run);

		return () => {
			cancelAnimationFrame(refRequest.current);
			refRequest.current = 0;
		};
	}, [run]);

	return {
		time,
	};
};
