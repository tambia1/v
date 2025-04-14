import { Theme } from "@src/theme/Theme.types";
import { HTMLAttributes } from "react";
import * as S from "./Compose.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	width?: keyof Theme["size"];
	height?: keyof Theme["size"];
};

export const Compose = ({ children, ...rest }: Props) => {
	return <S.Compose {...rest}>{children}</S.Compose>;
};
