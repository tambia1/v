import * as S from "./CellRight.styles";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const CellRight = ({ children }: Props) => {
	return <S.CellRight>{children}</S.CellRight>;
};
