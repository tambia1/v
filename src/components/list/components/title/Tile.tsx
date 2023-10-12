import * as S from "./Title.styles";
import { HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

export const Title = ({ children, ...rest }: Props) => {
	return <S.Title {...rest}>{children}</S.Title>;
};
