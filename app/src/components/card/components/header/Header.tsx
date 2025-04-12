import { IconName } from "@src/components/icon/Icon.types";
import type { ReactNode } from "react";
import * as S from "./Header.styles";

export type Props = {
	collapsed: boolean;
	onClickCollapse?: () => void;
	iconName?: IconName;
	content: ReactNode;
};

export const Header = ({ content, iconName = "iconChevronDown", collapsed, onClickCollapse }: Props) => {
	const handleOnClick = () => {
		if (onClickCollapse) {
			onClickCollapse();
		}
	};

	return (
		<S.Header onClick={handleOnClick}>
			<S.HeaderContent>{content}</S.HeaderContent>
			<S.HeaderIcon iconName={iconName} size="xxs" collapsed={collapsed} />
		</S.Header>
	);
};
