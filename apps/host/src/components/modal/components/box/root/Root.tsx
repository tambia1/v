import { MouseEvent, ReactNode } from "react";

import * as S from "./Root.styles";

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

export const Root = ({ children }: Props) => {
	return <S.Root onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>{children}</S.Root>;
};
