import { ReactNode } from "react";
import { Box } from "./components/box/Box";
import { IconsName } from "./components/box/components/content/components/icon/Icon.styles";
import { Button } from "../button/Button";
import { Compose } from "./components/compose/Compose";

interface Props {
	className?: string;
	children?: ReactNode;
	isVisible?: boolean;
	onClickBackground?: () => void;
	iconName?: IconsName;
	text?: ReactNode;
	buttons: {
		content: ReactNode;
		onClick: () => void;
	}[];
}

export const Modal = ({ className, isVisible = true, text, iconName, buttons, onClickBackground }: Props) => {
	const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		onClickBackground?.();
	};

	return (
		<Modal.Compose className={className} isVisible={isVisible} onClick={handleOnClick}>
			<Modal.Box.Compose>
				<Modal.Box.Content.Compose>
					{iconName && <Modal.Box.Content.Icon iconName={iconName} />}
					{text && <Modal.Box.Content.Text>{text}</Modal.Box.Content.Text>}
				</Modal.Box.Content.Compose>

				<Modal.Box.Buttons>
					{buttons.map((button) => (
						<Button onClick={button.onClick} variant="styled">
							{button.content}
						</Button>
					))}
				</Modal.Box.Buttons>
			</Modal.Box.Compose>
		</Modal.Compose>
	);
};

Modal.Compose = Compose;
Modal.Box = Box;
