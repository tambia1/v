import { ReactNode } from "react";
import { Box } from "./components/box/Box";
import { IconsName } from "./components/box/components/content/components/icon/Icon.styles";
import { Compose } from "./compose/Compose";

type Props = {
	isVisible?: boolean;
	onClickBackground?: () => void;
	iconName?: IconsName;
	title?: ReactNode;
	text?: ReactNode;
	buttons: {
		content: ReactNode;
		onClick: () => void;
	}[];
};

export const Modal = ({ isVisible = true, onClickBackground, title, text, iconName, buttons }: Props) => {
	return (
		<Modal.Compose isVisible={isVisible} onClickBackground={onClickBackground}>
			<Modal.Box iconName={iconName} title={title} text={text} buttons={buttons} />
		</Modal.Compose>
	);
};

Modal.Compose = Compose;
Modal.Box = Box;
