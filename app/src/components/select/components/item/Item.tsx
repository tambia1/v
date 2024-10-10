import type { ReactNode } from "react";
import * as S from "./Item.styles";

export interface Props {
	children: ReactNode;
}

export const Item = ({ children }: Props) => {
	return <S.Item>{children}</S.Item>;
};
