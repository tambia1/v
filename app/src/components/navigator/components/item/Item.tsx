import type { ReactNode } from "react";
import * as S from "./Item.styles";

type Props = {
	animation: S.AnimationState;
	children?: ReactNode;
	onAnimStart?: () => void;
	onAnimEnd?: () => void;
};

export const Item = ({ children, animation, onAnimStart: onStart, onAnimEnd: onEnd }: Props) => {
	const handleOnAnimationStart = (e: React.AnimationEvent) => {
		e.stopPropagation();
		onStart?.();
	};

	const handleOnAnimationEnd = (e: React.AnimationEvent) => {
		e.stopPropagation();
		onEnd?.();
	};

	return (
		<S.Item $animationState={animation} onAnimationStart={handleOnAnimationStart} onAnimationEnd={handleOnAnimationEnd}>
			{children}
		</S.Item>
	);
};
