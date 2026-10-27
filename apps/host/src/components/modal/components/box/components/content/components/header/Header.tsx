import { ReactNode } from "react";

import { Description } from "./components/description/Description";
import { Title } from "./components/title/Title";
import { Root } from "./root/Root";

export type Props = {
	title?: ReactNode;
	description?: ReactNode;
};

export const Header = ({ title, description }: Props) => {
	return (
		<Header.Root>
			<Header.Title>{title}</Header.Title>
			<Header.Description>{description}</Header.Description>
		</Header.Root>
	);
};

Header.Root = Root;
Header.Title = Title;
Header.Description = Description;
