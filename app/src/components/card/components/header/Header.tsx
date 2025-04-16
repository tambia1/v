import { IconName } from "@src/components/icon/Icon.types";
import type { ReactNode } from "react";
import { Content } from "./components/content/Content";
import { Icon } from "./components/icon/Icon";
import { Compose } from "./compose/Compose";

export type Props = {
	collapsed?: boolean;
	onClickCollapse?: () => void;
	iconName?: IconName;
	content?: ReactNode;
};

export const Header = ({ content, iconName = "iconChevronDown", collapsed = false, onClickCollapse }: Props) => {
	if (!content) {
		return null;
	}

	const handleOnClick = () => {
		if (onClickCollapse) {
			onClickCollapse();
		}
	};

	return (
		<Header.Compose onClick={handleOnClick} clickable={!!onClickCollapse}>
			<Header.Content content={content} />
			<Header.Icon iconName={onClickCollapse ? iconName : ""} collapsed={collapsed} />
		</Header.Compose>
	);
};

Header.Compose = Compose;
Header.Content = Content;
Header.Icon = Icon;
