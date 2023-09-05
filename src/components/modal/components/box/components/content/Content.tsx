import { ReactNode } from "react";
import * as S from "./Content.styles";
import { Icon } from "./components/icon/Icon";
import { Text } from "./components/text/text";

interface Props {
	children?: ReactNode;
}

export const Content = ({ children }: Props) => {
	return <Content.Compose>{children}</Content.Compose>;
};

Content.Compose = S.Container;
Content.Icon = Icon;
Content.Text = Text;
