import { useState, ReactNode } from "react";
import * as S from "./Page.styles";

interface Props {
	index?: number;
	children?: ReactNode;
}

export const Page = ({ children, index }: Props) => {
	return <S.Page index={index || 0}>{children}</S.Page>;
};
