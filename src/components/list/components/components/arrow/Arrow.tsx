import * as S from "./Arrow.styles";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const Arrow = ({ children }: Props) => {
	return <S.Arrow>{children}</S.Arrow>;
};
