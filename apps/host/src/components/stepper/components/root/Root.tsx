import type { ReactNode } from "react";

import * as S from "./Root.styles";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export const Root = ({ children, ...rest }: Props) => {
	return <S.Root {...rest}>{children}</S.Root>;
};
