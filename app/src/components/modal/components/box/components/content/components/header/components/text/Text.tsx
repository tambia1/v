import { ReactNode } from "react";
import * as S from "./Text.styles";

export interface Props {
	children: ReactNode;
}

export const Text = ({ children }: Props) => {
	return children && <S.Text>{children}</S.Text>;
};
