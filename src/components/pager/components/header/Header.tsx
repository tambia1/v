import { ReactNode } from "react";
import * as S from "./Header.styles";

interface Props {
	children?: ReactNode;
}

export const Header = ({ children }: Props) => {
	return <S.Container>{children}</S.Container>;
};
