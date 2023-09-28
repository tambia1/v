import { ReactNode } from "react";
import * as S from "./Body.styles";

interface Props {
	state: S.State;
	children?: ReactNode;
	onAnimationStart?: () => void;
	onAnimationEnd?: () => void;
}

export const Body = ({ children, state, onAnimationStart, onAnimationEnd }: Props) => {
	return (
		<S.Body $state={state} onAnimationStart={onAnimationStart} onAnimationEnd={onAnimationEnd}>
			{children}
		</S.Body>
	);
};
