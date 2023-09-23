import { useState, ReactNode } from "react";
import * as S from "./Page.styles";

interface Props {
	id: string;
	children?: ReactNode;
}

export const Page = ({ children }: Props) => {
	return <S.Page>{children}</S.Page>;
};
