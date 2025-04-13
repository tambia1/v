import { HTMLAttributes } from "react";
import * as S from "./Compose.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {};

export const Compose = ({ children, ...rest }: Props) => {
	return <S.Compose {...rest}>{children}</S.Compose>;
};
