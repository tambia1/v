import { useEffect, useRef, useState } from "react";

type Props = {
	callback: () => void;
};

export const useInterval = ({ callback }: Props) => {
	const intervalIdRef = useRef<number | null>(null);

	const [isActive, setIsActive] = useState(false);
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

		intervalIdRef.current = null;
	};

	return { start, stop, isActive };
};
