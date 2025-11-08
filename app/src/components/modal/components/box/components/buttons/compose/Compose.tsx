import { ReactNode } from "react";
import * as S from "./Compose.styles";

export type Props = {
	children?: ReactNode;
};

export const Compose = ({ children }: Props) => {
	return <S.Compose>{children}</S.Compose>;
};
