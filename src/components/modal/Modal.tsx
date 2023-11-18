import { ReactElement, ReactNode } from "react";
import * as S from "./Modal.styles";
import { Box } from "./components/box/Box";
import { IconsName } from "./components/box/components/content/components/icon/Icon.styles";
import { Button } from "../button/Button";

interface Props {
	children?: ReactNode;
	isVisible?: boolean;
	text?: ReactElement | string;
	buttonContentA?: ReactElement | string;
	buttonCallbackA?: () => void;
	buttonContentB?: ReactElement | string;
	buttonCallbackB?: () => void;
	iconName?: IconsName;
	onClickBackground?: () => void;
}

export const Modal = ({ isVisible = true, text, iconName, buttonContentA, buttonCallbackA, buttonContentB, buttonCallbackB, onClickBackground }: Props) => {
	const handleOnClick = () => {
		onClickBackground?.();
	};

	return (
		<>
			{isVisible && (
				<Modal.Compose onClick={handleOnClick}>
					<Modal.Box.Compose>
						<Modal.Box.Content.Compose>
							{iconName && <Modal.Box.Content.Icon iconName={iconName} />}
							{text && <Modal.Box.Content.Text>{text}</Modal.Box.Content.Text>}
						</Modal.Box.Content.Compose>

						<Modal.Box.Buttons>
							{buttonContentA && <Button onClick={buttonCallbackA}>{buttonContentA}</Button>}
							{buttonContentB && <Button onClick={buttonCallbackB}>{buttonContentB}</Button>}
						</Modal.Box.Buttons>
					</Modal.Box.Compose>
				</Modal.Compose>
			)}
		</>
	);
};

Modal.Compose = S.Modal;
Modal.Box = Box;
