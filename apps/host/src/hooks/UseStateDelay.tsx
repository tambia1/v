import { useRef, useState } from "react";

export const useStateDelay = <S extends {}>(initialState: S): [S, (value: S, delay: number) => Promise<void>, () => void] => {
	const [state, setState] = useState<S>(initialState);
	const timeoutRef = useRef<NodeJS.Timeout>(undefined);

	const setStateDelay = (value: S, delay: number): Promise<void> => {
		cancelSetState();

		return new Promise((resolve) => {
			timeoutRef.current = setTimeout(() => {
				setState(value);
				resolve();
			}, delay);
		});
	};

	const cancelSetState = () => {
		clearTimeout(timeoutRef.current);
	};

	return [state, setStateDelay, cancelSetState];
};
