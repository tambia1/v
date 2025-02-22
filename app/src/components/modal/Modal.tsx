import { ReactNode } from "react";
import { Button } from "../button/Button";
import { Box } from "./components/box/Box";
import { IconsName } from "./components/box/components/content/components/icon/Icon.styles";
import { Compose } from "./components/compose/Compose";

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
		<>
			{isVisible && (
				<Modal.Compose onClick={handleOnClick}>
					<Modal.Box.Compose>
						<Modal.Box.Content.Compose>
							{iconName && <Modal.Box.Content.Icon iconName={iconName} />}

							<Modal.Box.Content.Box>
								{title && <Modal.Box.Content.Title>{title}</Modal.Box.Content.Title>}
								{text && <Modal.Box.Content.Text>{text}</Modal.Box.Content.Text>}
							</Modal.Box.Content.Box>
						</Modal.Box.Content.Compose>

						<Modal.Box.Buttons>
							{buttons.map((button, index) => (
								<Button key={index} onClick={button.onClick} variant="styled" size="s">
									{button.content}
								</Button>
							))}
						</Modal.Box.Buttons>
					</Modal.Box.Compose>
				</Modal.Compose>
			)}
		</>
	);
};

Modal.Compose = Compose;
Modal.Box = Box;
