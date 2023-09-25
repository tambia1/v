import { useState, ReactNode } from "react";
import * as S from "./Header.styles";
import { usePager } from "../../hooks/UsePager";

interface Props {
	children?: ReactNode;
}

export const Header = ({ children }: Props) => {
	return <S.Container>{children}</S.Container>;
};
