import { Button } from "@src/components/button/Button";
import { ReactNode } from "react";

import { Root } from "./root/Root";

export type Props = {
	buttons?: {
		content: ReactNode;
		onClick: () => void;
	}[];
};

export const Buttons = ({ buttons = [] }: Props) => {
	return (
		<Buttons.Root>
			{buttons.map((button, index) => (
				<Button key={index} onClick={button.onClick} variant="styled" size="size500">
					{button.content}
				</Button>
			))}
		</Buttons.Root>
	);
};

Buttons.Root = Root;
