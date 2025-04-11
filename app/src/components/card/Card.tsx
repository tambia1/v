import { ReactNode } from "react";
import { Box } from "./components/box/Box";
import { IconsName } from "./components/box/components/content/components/icon/Icon.styles";
import { Compose } from "./compose/Compose";

type Props = {
	isVisible?: boolean;
	onClickBackground?: () => void;
	iconName?: IconsName;
	title?: ReactNode;
	description?: ReactNode;
	buttons: {
		content: ReactNode;
		onClick: () => void;
	}[];
};

export const Card = ({ isVisible = true, onClickBackground, title, description, iconName, buttons }: Props) => {
	return (
		<Card.Compose isVisible={isVisible} onClickBackground={onClickBackground}>
			<Card.Box iconName={iconName} title={title} description={description} buttons={buttons} />
		</Card.Compose>
	);
};

Card.Compose = Compose;
Card.Box = Box;
