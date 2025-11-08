import { ErrorInfo, ReactNode, Suspense, useEffect, useRef } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { SuspensionFallback } from "./SuspensionFallback";

type Props = {
	children?: ReactNode;
	onStart?: () => void;
	onEnd?: () => void;
	onFallbackStart?: () => void;
	onFallbackEnd?: () => void;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

export const Suspension = ({ children, onStart, onEnd, onFallbackStart, onFallbackEnd, onError }: Props) => {
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

	const handleOnError = (error: Error, errorInfo: ErrorInfo) => {
		onError?.(error, errorInfo);
	};

	return (
		<ErrorBoundary onError={handleOnError}>
			<Suspense fallback={<SuspensionFallback onFallbackStart={handleOnFallbackStart} onFallbackEnd={handleOnFallbackEnd} />}>{children}</Suspense>
		</ErrorBoundary>
	);
};
