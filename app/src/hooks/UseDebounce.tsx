import { useRef, useEffect } from "react";

export const useDebounce = <F extends (...args: string[]) => void>(callback: F, delay = 1000) => {
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, []);

	const debounce = (...args: Parameters<F>) => {
		clearTimeout(timeoutRef.current);

		const newTimer = setTimeout(() => {
			callback(...args);
		}, delay);

		timeoutRef.current = newTimer;
	};

	return debounce;
};
