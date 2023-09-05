import { ReactNode } from "react";
import * as S from "./Modal.styles";
import { Box } from "./components/box/Box";
import { Buttons } from "./components/box/components/buttons/Buttons";

interface Props {
	className?: string | undefined;
	children?: ReactNode;
	isVisible: boolean;
	onClickBackground?: () => void;
}

export const Modal = ({ children, className, isVisible, onClickBackground }: Props) => {
	const handleOnClick = () => {
		onClickBackground?.();
	};

	return (
		<>
			{isVisible && (
				<Modal.Compose className={className} onClick={handleOnClick}>
					<Modal.Box>{children}</Modal.Box>
				</Modal.Compose>
			)}
		</>
	);
};

Modal.Compose = S.Container;
Modal.Box = Box;
Modal.Buttons = Buttons;
