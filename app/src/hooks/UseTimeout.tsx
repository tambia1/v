import { useEffect, useRef, useState } from "react";

type Props = {
	callback: () => void;
};

export const useTimeout = ({ callback }: Props) => {
	const timeoutIdRef = useRef<number | null>(null);

	const [isActive, setIsActive] = useState(false);
	const [isPerformCallback, setIsPerformCallback] = useState(false);

	useEffect(() => {
		return () => {
			clearTimeout(timeoutIdRef.current || undefined);
		};
	}, []);

	useEffect(() => {
		if (isPerformCallback) {
			callback();
			setIsActive(false);
			setIsPerformCallback(false);
		}
	}, [isPerformCallback, callback]);

	const start = (timeout: number) => {
		if (isActive || timeout <= 0) {
			return;
		}

		setIsActive(true);

		timeoutIdRef.current = window.setTimeout(() => {
			setIsPerformCallback(true);
		}, timeout);
	};

	const stop = () => {
		if (!isActive) {
			return;
		}

		setIsActive(false);
		setIsPerformCallback(false);
		clearTimeout(timeoutIdRef.current || undefined);

		timeoutIdRef.current = null;
	};

	return { start, stop, isActive };
};
