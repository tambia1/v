import { ReactNode } from "react";
import * as S from "./Buttons.styles";

interface Props {
	children?: ReactNode;
}

export const Buttons = ({ children }: Props) => {
	return <Buttons.Compose>{children}</Buttons.Compose>;
};

Buttons.Compose = S.Container;
