import * as S from "./CellCenter.styles";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const CellCenter = ({ children }: Props) => {
	return <S.CellCenter>{children}</S.CellCenter>;
};
