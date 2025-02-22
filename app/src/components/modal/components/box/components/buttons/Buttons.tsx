import { Button } from "@src/components/button/Button";
import { ReactNode } from "react";
import { Compose } from "./compose/Compose";

export interface Props {
	buttons: {
		content: ReactNode;
		onClick: () => void;
	}[];
}

export const Buttons = ({ buttons }: Props) => {
	return (
		<Buttons.Compose>
			{buttons.map((button, index) => (
				<Button key={index} onClick={button.onClick} variant="styled" size="s">
					{button.content}
				</Button>
			))}
		</Buttons.Compose>
	);
};

Buttons.Compose = Compose;
