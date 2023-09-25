import { Icon } from "@src/components/icon/Icon";
import * as S from "./Image.styles";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export const Image = ({ children }: Props) => {
	return <S.Container>{children}</S.Container>;
};
