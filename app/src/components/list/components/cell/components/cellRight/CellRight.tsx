import type { ReactNode } from "react";
import * as S from "./CellRight.styles";

export interface Props {
	children?: ReactNode;
}

export const CellRight = ({ children }: Props) => {
	return <S.CellRight>{children}</S.CellRight>;
};
