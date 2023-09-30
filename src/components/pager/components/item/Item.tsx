import { ReactNode } from "react";
import * as S from "./Item.styles";

interface Props {
	state: S.IState;
	children?: ReactNode;
	onAnimationStart?: () => void;
	onAnimationEnd?: () => void;
}

export const Item = ({ children, state, onAnimationStart, onAnimationEnd }: Props) => {
	return (
		<S.Item $state={state} onAnimationStart={onAnimationStart} onAnimationEnd={onAnimationEnd}>
			{children}
		</S.Item>
	);
};
