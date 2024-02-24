import { useEffect, Suspense, ReactNode, useRef } from "react";
import { SuspensionFallback } from "./SuspensionFallback";

interface Props {
	children?: ReactNode;
	onStart?: () => void;
	onEnd?: () => void;
	onFallbackStart?: () => void;
	onFallbackEnd?: () => void;
}

export const Suspension = ({ children, onStart, onEnd, onFallbackStart, onFallbackEnd }: Props) => {
	const ref = useRef(0);

	useEffect(() => {
		if (ref.current == 0) {
			onStart?.();
			onEnd?.();
		}
	}, []);

	const handleOnFallbackStart = () => {
		ref.current = 1;
		onStart?.();
		onFallbackStart?.();
	};

	const handleOnFallbackEnd = () => {
		ref.current = 2;
		onFallbackEnd?.();
		onEnd?.();
	};

	return <Suspense fallback={<SuspensionFallback onFallbackStart={handleOnFallbackStart} onFallbackEnd={handleOnFallbackEnd} />}>{children}</Suspense>;
};
