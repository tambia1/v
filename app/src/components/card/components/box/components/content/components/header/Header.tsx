import { ReactNode } from "react";
import { Description } from "./components/description/Description";
import { Title } from "./components/title/Title";
import { Compose } from "./compose/Compose";

export interface Props {
	title?: ReactNode;
	description?: ReactNode;
}

export const Header = ({ title, description }: Props) => {
	return (
		<Header.Compose>
			<Header.Title>{title}</Header.Title>
			<Header.Description>{description}</Header.Description>
		</Header.Compose>
	);
};

Header.Compose = Compose;
Header.Title = Title;
Header.Description = Description;
