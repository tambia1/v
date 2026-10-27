import { ReactNode } from "react";

import { Buttons } from "./components/buttons/Buttons";
import { IconsName } from "./components/content/components/icon/Icon.styles";
import { Content } from "./components/content/Content";
import { Root } from "./root/Root";

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
		<Box.Root>
			<Box.Content iconName={iconName} title={title} description={description} />
			<Box.Buttons buttons={buttons} />
		</Box.Root>
	);
};

Box.Root = Root;
Box.Content = Content;
Box.Buttons = Buttons;
