import * as S from "./CellLeft.styles";
import { ReactNode } from "react";

export interface Props {
	children?: ReactNode;
}

export const CellLeft = ({ children }: Props) => {
	return <S.CellLeft>{children}</S.CellLeft>;
};
