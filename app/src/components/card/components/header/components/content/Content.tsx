import type { ReactNode } from "react";
import * as S from "./Content.styles";

export type Props = {
	content?: ReactNode;
};

export const Content = ({ content }: Props) => {
	return <S.Content>{content}</S.Content>;
};
