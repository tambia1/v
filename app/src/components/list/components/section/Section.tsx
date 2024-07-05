import * as S from "./Section.styles";
import { HTMLProps, ReactNode } from "react";

export interface Props extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

export const Section = ({ children, ...rest }: Props) => {
	return <S.Section {...rest}>{children}</S.Section>;
};
