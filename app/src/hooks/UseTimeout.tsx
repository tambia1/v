import { useEffect, useRef } from "react";

export const useTimeout = (callbackTimeout: () => void, timeout: number) => {
	const callbackTimeoutRef = useRef(callbackTimeout);

	useEffect(() => {
		callbackTimeoutRef.current = callbackTimeout;
	}, [callbackTimeout]);

	useEffect(() => {
		if (timeout <= 0) {
			return;
		}

		const timeoutId = setTimeout(() => {
			clearTimeout(timeoutId);

			callbackTimeoutRef.current();
		}, timeout);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [timeout]);
};
