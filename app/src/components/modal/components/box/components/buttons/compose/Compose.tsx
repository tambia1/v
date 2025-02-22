import { ReactNode } from "react";
import * as S from "./Compose.styles";

export interface Props {
	children?: ReactNode;
}

export const Compose = ({ children }: Props) => {
	return <S.Compose>{children}</S.Compose>;
};
