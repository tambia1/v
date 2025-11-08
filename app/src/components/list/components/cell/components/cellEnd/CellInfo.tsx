import type { ReactNode } from "react";
import * as S from "./CellInfo.styles";

export type Props = {
	children?: ReactNode;
};

export const CellInfo = ({ children }: Props) => {
	return <S.CellInfo>{children}</S.CellInfo>;
};
