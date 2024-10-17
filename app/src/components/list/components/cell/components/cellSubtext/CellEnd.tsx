import type { ReactNode } from "react";
import * as S from "./CellEnd.styles";

export interface Props {
	children?: ReactNode;
}

export const CellEnd = ({ children }: Props) => {
	return <S.CellEnd>{children}</S.CellEnd>;
};
