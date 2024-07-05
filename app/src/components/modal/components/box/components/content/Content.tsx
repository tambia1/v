import { ReactNode } from "react";
import * as S from "./Content.styles";
import { Icon } from "./components/icon/Icon";
import { Text } from "./components/text/text";

export interface Props {
	children?: ReactNode;
}

export const Content = ({ children }: Props) => {
	return <Content.Compose>{children}</Content.Compose>;
};

Content.Compose = S.Content;
Content.Icon = Icon;
Content.Text = Text;
