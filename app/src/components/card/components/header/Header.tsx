import { IconName } from "@src/components/icon/Icon.types";
import type { ReactNode } from "react";
import * as S from "./Header.styles";
import { Compose } from "./compose/Compose";

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
		<Header.Compose onClick={handleOnClick}>
			<Header.Content>{content}</Header.Content>
			<Header.Icon iconName={iconName} size="xxs" collapsed={collapsed} />
		</Header.Compose>
	);
};

Header.Compose = Compose;
Header.Content = S.HeaderContent;
Header.Icon = S.HeaderIcon;
