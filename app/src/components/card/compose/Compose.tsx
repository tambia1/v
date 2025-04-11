import { ReactNode } from "react";
import * as S from "./Compose.styles";

export interface Props {
	children?: ReactNode;
	isVisible: boolean;
	onClickBackground?: () => void;
}

export const Compose = ({ children, isVisible, onClickBackground }: Props) => {
	const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		onClickBackground?.();
	};

	return <>{isVisible && <S.Compose onClick={handleOnClick}>{children}</S.Compose>}</>;
};
