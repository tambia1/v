import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay: number) => {
	const [debouncedValue, setDebaouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebaouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};
