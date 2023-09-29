import * as S from "./List.styles";
import { ReactNode } from "react";
import { ListCell } from "./components/listCell/ListCell";
import { ListTitle } from "./components/listTitle/ListTile";

interface Props {
	children?: ReactNode;
}

export const List = ({ children }: Props) => {
	return <S.Container>{children}</S.Container>;
};

List.Cell = ListCell;
List.Title = ListTitle;
