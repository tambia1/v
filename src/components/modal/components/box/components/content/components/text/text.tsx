import { ReactNode } from "react";
import * as S from "./text.styles";

interface Props {
	children?: ReactNode;
}

export const Text = ({ children }: Props) => {
	return <Text.Compose>{children}</Text.Compose>;
};

Text.Compose = S.Contaier;
