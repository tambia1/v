import { MouseEvent, ReactNode } from "react";
import * as S from "./Box.styles";
import { Buttons } from "./components/buttons/Buttons";
import { Content } from "./components/content/Content";

interface Props {
	children?: ReactNode;
}

export const Box = ({ children }: Props) => {
	return <Box.Compose onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>{children}</Box.Compose>;
};

Box.Compose = S.Box;
Box.Content = Content;
Box.Buttons = Buttons;
