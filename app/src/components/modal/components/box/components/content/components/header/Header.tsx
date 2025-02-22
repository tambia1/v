import { ReactNode } from "react";
import { Text } from "./components/text/Text";
import { Title } from "./components/title/Title";
import { Compose } from "./compose/Compose";

export interface Props {
	title?: ReactNode;
	text?: ReactNode;
}

export const Header = ({ title, text }: Props) => {
	return (
		<Header.Compose>
			<Header.Title>{title}</Header.Title>
			<Header.Text>{text}</Header.Text>
		</Header.Compose>
	);
};

Header.Compose = Compose;
Header.Title = Title;
Header.Text = Text;
