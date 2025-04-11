import { ReactNode } from "react";
import * as S from "./Description.styles";

export interface Props {
	children: ReactNode;
}

export const Description = ({ children }: Props) => {
	return children && <S.Description>{children}</S.Description>;
};
