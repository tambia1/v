import { HTMLAttributes } from "react";
import * as S from "./Compose.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {};

export const Compose = ({ children }: Props) => {
	return <S.Compose>{children}</S.Compose>;
};
