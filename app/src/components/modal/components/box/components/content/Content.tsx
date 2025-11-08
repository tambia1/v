import { ReactNode } from "react";
import { Header } from "./components/header/Header";
import { Icon } from "./components/icon/Icon";
import { IconsName } from "./components/icon/Icon.styles";
import { Compose } from "./compose/Compose";

export type Props = {
	iconName?: IconsName;
	title?: ReactNode;
	description?: ReactNode;
};

export const Content = ({ iconName, title, description }: Props) => {
	return (
		<Content.Compose>
			<Content.Icon iconName={iconName} />
			<Content.Header title={title} description={description} />
		</Content.Compose>
	);
};

Content.Compose = Compose;
Content.Icon = Icon;
Content.Header = Header;
