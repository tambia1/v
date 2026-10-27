import { Theme } from "@src/theme/Theme.types";
import { HTMLAttributes } from "react";

import * as S from "./Root.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	width?: keyof Theme["size"];
	height?: keyof Theme["size"];
};

export const Root = ({ children, ...rest }: Props) => {
	return <S.Root {...rest}>{children}</S.Root>;
};
