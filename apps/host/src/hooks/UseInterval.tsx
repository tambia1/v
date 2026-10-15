import { useEffect, useRef } from "react";

type Props = {
	delay: number;
	callback: () => void;
};

export const useInterval = ({ delay, callback }: Props) => {
	const timeoutIdRef = useRef<number | null>(null);
	const isActiveRef = useRef(false);

	useEffect(() => {
		return () => {
			stop();
		};
	}, []);

	const start = () => {
		stop();

		isActiveRef.current = true;

		timeoutIdRef.current = window.setInterval(() => {
			callback();
		}, delay);
	};

	const stop = () => {
		isActiveRef.current = false;

		clearTimeout(timeoutIdRef.current || undefined);
		timeoutIdRef.current = null;
	};

	return {
		start,
		stop,
		isActive: isActiveRef.current,
	};
};
