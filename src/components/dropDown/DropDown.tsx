import { ReactNode } from "react";
import { List } from "../list/List";
import * as S from "./DropDown.styles";

interface Props {
	children: ReactNode;
}

export const DropDown = ({ children }: Props) => {
	return <S.DropDown>{children}</S.DropDown>;
};

DropDown.Button = List;
DropDown.List = List;
