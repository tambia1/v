import { useEffect } from "react";

type Props = {
	onFallbackStart: () => void;
	onFallbackEnd: () => void;
};

export const SuspensionFallback = ({ onFallbackStart, onFallbackEnd }: Props) => {
	useEffect(() => {
		onFallbackStart();

		return () => {
			onFallbackEnd();
		};
	}, []);

	return null;
};
