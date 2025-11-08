import { ReactNode } from "react";
import * as S from "./Description.styles";

export type Props = {
	children: ReactNode;
};

export const Description = ({ children }: Props) => {
	return children && <S.Description>{children}</S.Description>;
};
