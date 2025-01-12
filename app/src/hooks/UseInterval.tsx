import { useEffect, useRef, useState } from "react";

type Props = {
	callback: () => void;
};

export const useInterval = ({ callback }: Props) => {
	const intervalIdRef = useRef<number | null>(null);
	const startTimeRef = useRef<number | null>(null);

	const [isActive, setIsActive] = useState(false);
	const [remainingTime, setRemainingTime] = useState(0);
	const [isPerformCallback, setIsPerformCallback] = useState(false);

	useEffect(() => {
		return () => {
			clearInterval(intervalIdRef.current || undefined);
		};
	}, []);

	useEffect(() => {
		if (isPerformCallback) {
			callback();
			setIsPerformCallback(false);
		}
	}, [isPerformCallback, callback]);

	const start = (interval: number) => {
		if (isActive || interval <= 0) {
			return;
		}

		setIsActive(true);
		setRemainingTime(interval);
		startTimeRef.current = Date.now();

		intervalIdRef.current = window.setInterval(() => {
			setIsPerformCallback(true);
		}, interval);
	};

	const stop = () => {
		if (!isActive) {
			return;
		}

		setIsActive(false);
		setIsPerformCallback(false);
		clearInterval(intervalIdRef.current || undefined);

		const elapsedTime = Date.now() - (startTimeRef.current ?? 0);
		setRemainingTime((prev) => Math.max(0, prev - elapsedTime));
	};

	const reset = () => {
		clearInterval(intervalIdRef.current || undefined);
		setIsActive(false);
		setRemainingTime(0);

		startTimeRef.current = null;
		intervalIdRef.current = null;
	};

	return { start, stop, reset, isActive, remainingTime };
};
