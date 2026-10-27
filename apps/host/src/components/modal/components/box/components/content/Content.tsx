import { ReactNode } from "react";

import { Header } from "./components/header/Header";
import { Icon } from "./components/icon/Icon";
import { IconsName } from "./components/icon/Icon.styles";
import { Root } from "./root/Root";

export type Props = {
	iconName?: IconsName;
	title?: ReactNode;
	description?: ReactNode;
};

export const Content = ({ iconName, title, description }: Props) => {
	return (
		<Content.Root>
			<Content.Icon iconName={iconName} />
			<Content.Header title={title} description={description} />
		</Content.Root>
	);
};

Content.Root = Root;
Content.Icon = Icon;
Content.Header = Header;
