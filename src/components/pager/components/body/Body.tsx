import { useState, ReactNode } from "react";
import * as S from "./Body.styles";
import { usePager } from "../../hooks/UsePager";

interface Props {
	title: string;
	page: ReactNode;
}

export const Body = ({ title, page }: Props) => {
	return <S.Container></S.Container>;
};
