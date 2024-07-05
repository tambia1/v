import * as S from "./List.styles";
import { ReactNode } from "react";
import { Cell } from "./components/cell/Cell";

export interface Props {
	children?: ReactNode;
}

export const List = ({ children }: Props) => {
	return <S.List>{children}</S.List>;
};

List.Cell = Cell;
