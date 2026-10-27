import { ReactNode } from "react";

import * as S from "./Root.styles";

export type Props = {
	children?: ReactNode;
};

export const Root = ({ children }: Props) => {
	return <S.Root>{children}</S.Root>;
};
