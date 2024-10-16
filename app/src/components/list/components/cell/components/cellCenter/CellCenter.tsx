import type { ReactNode } from "react";
import * as S from "./CellCenter.styles";

export interface Props {
	children?: ReactNode;
}

export const CellCenter = ({ children }: Props) => {
	return <S.CellCenter>{children}</S.CellCenter>;
};
