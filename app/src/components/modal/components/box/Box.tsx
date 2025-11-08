import { ReactNode } from "react";
import { Buttons } from "./components/buttons/Buttons";
import { Content } from "./components/content/Content";
import { IconsName } from "./components/content/components/icon/Icon.styles";
import { Compose } from "./compose/Compose";

export type Props = {
	iconName?: IconsName;
	title?: ReactNode;
	description?: ReactNode;
	buttons?: {
		content: ReactNode;
		onClick: () => void;
	}[];
};

export const Box = ({ title, description, iconName, buttons }: Props) => {
	return (
		<Box.Compose>
			<Box.Content iconName={iconName} title={title} description={description} />
			<Box.Buttons buttons={buttons} />
		</Box.Compose>
	);
};

Box.Compose = Compose;
Box.Content = Content;
Box.Buttons = Buttons;
