import { MouseEvent, ReactNode } from "react";
import { Buttons } from "./components/buttons/Buttons";
import { Content } from "./components/content/Content";
import { IconsName } from "./components/content/components/icon/Icon.styles";
import { Compose } from "./compose/Compose";

export interface Props {
	iconName?: IconsName;
	title?: ReactNode;
	text?: ReactNode;
	buttons?: {
		content: ReactNode;
		onClick: () => void;
	}[];
}

export const Box = ({ title, text, iconName, buttons }: Props) => {
	return (
		<Box.Compose onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
			<Box.Content iconName={iconName} title={title} text={text} />
			<Box.Buttons buttons={buttons} />
		</Box.Compose>
	);
};

Box.Compose = Compose;
Box.Content = Content;
Box.Buttons = Buttons;
