import { useEffect } from "react";

interface Props {
	onFallbackStart: () => void;
	onFallbackEnd: () => void;
}

export const SuspenseFallback = ({ onFallbackStart, onFallbackEnd }: Props) => {
	useEffect(() => {
		onFallbackStart();

		return () => {
			onFallbackEnd();
		};
	}, [onFallbackStart]);

	return null;
};
