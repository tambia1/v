import { ReactNode } from "react";
import * as S from "./Compose.styles";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const Compose = ({ children, ...rest }: Props) => {
	return <S.Compose {...rest}>{children}</S.Compose>;
};
