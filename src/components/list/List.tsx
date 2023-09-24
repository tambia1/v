import * as S from "./List.styles";
import { ReactNode } from "react";
import { ListCell } from "./components/ListCell/ListCell";

interface Props {
	children?: ReactNode;
}

export const List = ({ children, ...rest }: Props) => {
	return <S.Container {...rest}>{children}</S.Container>;
};

List.Cell = ListCell;
