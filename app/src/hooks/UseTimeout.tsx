import { useEffect, useRef } from "react";

type Props = {
	delay: number;
	callback: () => void;
};

export const useTimeout = ({ delay, callback }: Props) => {
	const timeoutIdRef = useRef<number | null>(null);
	const isActiveRef = useRef(false);

	useEffect(() => {
		return () => {
			stop();
		};
	}, []);

	const start = () => {
		if (isActiveRef.current) {
			return;
		}

		stop();

		isActiveRef.current = true;

		timeoutIdRef.current = window.setTimeout(() => {
			isActiveRef.current = false;
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
