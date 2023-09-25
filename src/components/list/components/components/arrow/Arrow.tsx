import { Icon } from "@src/components/icon/Icon";
import * as S from "./Arrow.styles";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const Arrow = ({ children }: Props) => {
	return <S.Container>{children}</S.Container>;
};
