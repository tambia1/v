import { useEffect } from "react";

interface Props {
	onFallback: () => void;
}

export const SuspenseFallback = ({ onFallback }: Props) => {
	useEffect(() => {
		onFallback();
	}, [onFallback]);

	return null;
};
