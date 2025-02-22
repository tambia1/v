import { MouseEvent, ReactNode } from "react";
import { Buttons } from "./components/buttons/Buttons";
import { Content } from "./components/content/Content";
import { Compose } from "./compose/Compose";

export interface Props {
	children?: ReactNode;
}

export const Box = ({ children, ...rest }: Props) => {
	return (
		<Box.Compose onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()} {...rest}>
			{children}
		</Box.Compose>
	);
};

Box.Compose = Compose;
Box.Content = Content;
Box.Buttons = Buttons;
