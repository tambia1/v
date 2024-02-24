import * as S from "./CellLeft.styles";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const CellLeft = ({ children }: Props) => {
	return <S.CellLeft>{children}</S.CellLeft>;
};
