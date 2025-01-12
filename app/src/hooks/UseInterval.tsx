import { useEffect, useRef, useState } from "react";

type Props = {
	callback: () => void;
};

export const useInterval = ({ callback }: Props) => {
	const intervalIdRef = useRef<number | null>(null);

	const [starter, setStarter] = useState(-1);
	const [isPerformCallback, setIsPerformCallback] = useState(false);

	useEffect(() => {
		return () => {
			clearInterval(intervalIdRef.current || undefined);
		};
	}, []);

	useEffect(() => {
		if (starter !== -1) {
			intervalIdRef.current = window.setTimeout(() => {
				setIsPerformCallback(true);
			}, starter);
		}
	}, [starter]);

	useEffect(() => {
		if (isPerformCallback) {
			callback();

			setIsPerformCallback(false);
		}
	}, [isPerformCallback, callback]);

	const start = (interval: number) => {
		if (starter !== -1 || interval <= 0) {
			return;
		}

		setStarter(interval);
	};

	const stop = () => {
		setStarter(-1);
		setIsPerformCallback(false);
		clearInterval(intervalIdRef.current || undefined);

		intervalIdRef.current = null;
	};

	return {
		start,
		stop,
		isActive: starter !== -1,
	};
};
