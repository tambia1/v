import * as S from "./List.styles";
import { ReactNode } from "react";
import { ListCell } from "./components/ListCell/ListCell";

interface Props {
	children?: ReactNode;
}

export const List = ({ children }: Props) => {
	return <S.Container>{children}</S.Container>;
};

List.Cell = ListCell;
