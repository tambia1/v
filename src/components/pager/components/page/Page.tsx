import { ReactNode } from "react";
import * as S from "./Page.styles";

interface Props {
	state: S.State;
	children?: ReactNode;
	onAnimationStart?: () => void;
	onAnimationEnd?: () => void;
}

export const Page = ({ children, state, onAnimationStart, onAnimationEnd }: Props) => {
	return (
		<S.Page $state={state} onAnimationStart={onAnimationStart} onAnimationEnd={onAnimationEnd}>
			{children}
		</S.Page>
	);
};
