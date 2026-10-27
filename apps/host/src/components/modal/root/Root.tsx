import { Activity, ReactNode } from "react";

import * as S from "./Root.styles";

export type Props = {
	children?: ReactNode;
	isVisible: boolean;
	onClickBackground?: () => void;
};

export const Root = ({ children, isVisible, onClickBackground }: Props) => {
	const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== e.currentTarget) {
			return;
		}

		onClickBackground?.();
	};

	return (
		<Activity mode={isVisible ? "visible" : "hidden"}>
			<S.Root onClick={handleOnClick}>{children}</S.Root>
		</Activity>
	);
};
