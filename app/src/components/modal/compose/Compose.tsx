import { ReactNode } from "react";
import * as S from "./Compose.styles";

export interface Props {
	children?: ReactNode;
	isVisible: boolean;
	onClickBackground: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Compose = ({ children, isVisible, onClickBackground }: Props) => {
	return <>{isVisible && <S.Compose onClick={onClickBackground}>{children}</S.Compose>}</>;
};
