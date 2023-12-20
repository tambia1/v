import * as S from "./Section.styles";
import { HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

export const Section = ({ children }: Props) => {
	return <S.Section>{children}</S.Section>;
};
