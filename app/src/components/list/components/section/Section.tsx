import type { HTMLAttributes, ReactNode } from "react";
import * as S from "./Section.styles";

export interface Props extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const Section = ({ children, ...rest }: Props) => {
	return <S.Section {...rest}>{children}</S.Section>;
};
