import type { ReactNode } from "react";
import * as S from "./CellText.styles";

export interface Props {
	children?: ReactNode;
}

export const CellText = ({ children }: Props) => {
	return <S.CellText>{children}</S.CellText>;
};
