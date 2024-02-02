import { useEffect } from "react";

interface Props {
	onFallbackStart: () => void;
	onFallbackEnd: () => void;
}

export const SuspensionFallback = ({ onFallbackStart, onFallbackEnd }: Props) => {
	useEffect(() => {
		onFallbackStart();

		return () => {
			onFallbackEnd();
		};
	}, []);

	return null;
};
