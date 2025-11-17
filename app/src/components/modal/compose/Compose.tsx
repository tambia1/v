import { Activity, ReactNode } from "react";
import * as S from "./Compose.styles";

export type Props = {
	children?: ReactNode;
	isVisible: boolean;
	onClickBackground?: () => void;
};

export const Compose = ({ children, isVisible, onClickBackground }: Props) => {
	const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		onClickBackground?.();
	};

	return (
		<Activity mode={isVisible ? "visible" : "hidden"}>
			<S.Compose onClick={handleOnClick}>{children}</S.Compose>
		</Activity>
	);
};
