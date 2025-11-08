import type { ReactNode } from "react";
import * as S from "./CellIcon.styles";

export type Props = {
	children?: ReactNode;
};

export const CellIcon = ({ children }: Props) => {
	return <S.CellIcon>{children}</S.CellIcon>;
};
