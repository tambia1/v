import { ReactElement, ReactNode } from "react";
import { Box } from "./components/box/Box";
import { IconsName } from "./components/box/components/content/components/icon/Icon.styles";
import { Button } from "../button/Button";
import { Compose } from "./components/compose/Compose";
// import { useStoreModal } from "./stores/StoreModal";

interface Props {
	className?: string | undefined;
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

export const Modal = ({ className, isVisible = true, text, iconName, buttonContentA, buttonCallbackA, buttonContentB, buttonCallbackB, onClickBackground }: Props) => {
	// const {isVisible, setIsVisible} = useStoreModal();

	const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		onClickBackground?.();
	};

	return (
		<Modal.Compose className={className} onClick={handleOnClick} isVisible={isVisible}>
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
	);
};

Modal.Compose = Compose;
Modal.Box = Box;
