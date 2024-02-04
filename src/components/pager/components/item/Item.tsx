import { ReactNode } from "react";
import * as S from "./Item.styles";

interface Props {
	animation: S.IAnimationState;
	children?: ReactNode;
	onAnimationStart?: () => void;
	onAnimationEnd?: () => void;
}

export const Item = ({ children, animation, onAnimationStart, onAnimationEnd }: Props) => {
	const handleOnAnimationStart = (e: React.AnimationEvent) => {
		e.stopPropagation();
		onAnimationStart?.();
	};

	const handleOnAnimationEnd = (e: React.AnimationEvent) => {
		e.stopPropagation();
		onAnimationEnd?.();
	};

	return (
		<S.Item $animationState={animation} onAnimationStart={handleOnAnimationStart} onAnimationEnd={handleOnAnimationEnd}>
			{children}
		</S.Item>
	);
};
