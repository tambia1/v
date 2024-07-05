import * as S from "./Item.styles";
import { ReactNode } from "react";

export interface Props {
	children: ReactNode;
}

export const Item = ({ children }: Props) => {
	return <S.Item>{children}</S.Item>;
};
