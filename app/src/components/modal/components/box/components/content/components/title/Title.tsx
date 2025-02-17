import { ReactNode } from "react";
import * as S from "./Title.styles";

type Props = {
	children?: ReactNode;
};

export const Title = ({ children }: Props) => {
	return <Title.Compose>{children}</Title.Compose>;
};

Title.Compose = S.Title;
