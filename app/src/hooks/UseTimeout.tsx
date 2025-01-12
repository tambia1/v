import { useEffect, useRef, useState } from "react";

type Props = {
	callback: () => void;
};

export const useTimeout = ({ callback }: Props) => {
	const timeoutIdRef = useRef<number | null>(null);

	const [starter, setStarter] = useState(-1);
	const [isPerformCallback, setIsPerformCallback] = useState(false);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutIdRef.current || undefined);
		};
	}, []);

	useEffect(() => {
		if (starter !== -1) {
			timeoutIdRef.current = window.setTimeout(() => {
				setIsPerformCallback(true);
			}, starter);
		}
	}, [starter]);

	useEffect(() => {
		if (isPerformCallback) {
			callback();
			setStarter(-1);
			setIsPerformCallback(false);
		}
	}, [isPerformCallback, callback]);

	const start = (timeout: number) => {
		if (starter !== -1 || timeout <= 0) {
			return;
		}

		setStarter(timeout);
	};

	const stop = () => {
		setStarter(-1);
		setIsPerformCallback(false);
		clearTimeout(timeoutIdRef.current || undefined);

		timeoutIdRef.current = null;
	};

	return {
		start,
		stop,
		isActive: starter !== -1,
	};
};
