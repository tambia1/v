import * as S from "./Section.styles";
import { HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

export const Section = ({ children, ...rest }: Props) => {
	return <S.Section {...rest}>{children}</S.Section>;
};
