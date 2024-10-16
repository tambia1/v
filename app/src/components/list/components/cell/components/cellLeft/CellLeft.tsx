import type { ReactNode } from "react";
import * as S from "./CellLeft.styles";

export interface Props {
	children?: ReactNode;
}

export const CellLeft = ({ children }: Props) => {
	return <S.CellLeft>{children}</S.CellLeft>;
};
