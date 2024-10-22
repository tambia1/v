import type { ReactNode } from "react";
import * as S from "./CellInfo.styles";

export interface Props {
	children?: ReactNode;
}

export const CellInfo = ({ children }: Props) => {
	return <S.CellInfo>{children}</S.CellInfo>;
};
