import { ReactNode } from "react";
import * as S from "./Item.styles";

interface Props {
	animationType: S.IAnimationType;
	animation: S.IAnimationState;
	children?: ReactNode;
	onAnimationStart?: () => void;
	onAnimationEnd?: () => void;
}

export const Item = ({ children, animationType, animation, onAnimationStart, onAnimationEnd }: Props) => {
	return (
		<S.Item $animationType={animationType} $animationState={animation} onAnimationStart={onAnimationStart} onAnimationEnd={onAnimationEnd}>
			{children}
		</S.Item>
	);
};
