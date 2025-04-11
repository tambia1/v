import { MouseEvent, ReactNode } from "react";
import * as S from "./Compose.styles";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const Compose = ({ children }: Props) => {
	return <S.Compose onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>{children}</S.Compose>;
};
