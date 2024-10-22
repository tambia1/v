import type { ReactNode } from "react";
import * as S from "./CellImage.styles";

export interface Props {
	children?: ReactNode;
}

export const CellImage = ({ children }: Props) => {
	return <S.CellImage>{children}</S.CellImage>;
};
