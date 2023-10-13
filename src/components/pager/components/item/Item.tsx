import { ReactNode } from "react";
import * as S from "./Item.styles";

interface Props {
	animation: S.IAnimation;
	children?: ReactNode;
	onAnimationStart?: () => void;
	onAnimationEnd?: () => void;
}

export const Item = ({ children, animation, onAnimationStart, onAnimationEnd }: Props) => {
	return (
		<S.Item $animation={animation} onAnimationStart={onAnimationStart} onAnimationEnd={onAnimationEnd}>
			{children}
		</S.Item>
	);
};
