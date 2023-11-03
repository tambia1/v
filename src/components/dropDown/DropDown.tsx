import { ReactNode } from "react";
import * as S from "./DropDown.styles";
import { List } from "./components/list/List";

interface Props {
	children: ReactNode;
}

export const DropDown = ({ children }: Props) => {
	return <S.DropDown>{children}</S.DropDown>;
};

DropDown.List = List;
