import { ReactNode } from "react";
import { Box } from "./components/box/Box";
import { IconsName } from "./components/box/components/content/components/icon/Icon.styles";
import { Compose } from "./compose/Compose";

type Props = {
	children?: ReactNode;
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

export const Modal = ({ isVisible = true, title, text, iconName, buttons, onClickBackground }: Props) => {
	const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		onClickBackground?.();
	};

	return (
		<Modal.Compose isVisible={isVisible} onClickBackground={handleOnClick}>
			<Modal.Box>
				<Modal.Box.Content iconName={iconName} title={title} text={text} />
				<Modal.Box.Buttons buttons={buttons} />
			</Modal.Box>
		</Modal.Compose>
	);
};

Modal.Compose = Compose;
Modal.Box = Box;
