import { Icon } from "@src/components/icon/Icon";
import type { IconName } from "@src/components/icon/Icon.types";
import { type Touch, useTouch } from "@src/hooks/UseTouch";
import { useRef } from "react";
import * as S from "./Button.styles";

type Props = {
	iconName: IconName;
	onClick: () => void;
};

export const Button = ({ iconName, onClick }: Props) => {
	const refButton = useRef<HTMLDivElement>(null);

	useTouch({
		ref: refButton,
		onTouch: ({ status }: Touch) => {
			if (status === "down") {
				onClick?.();
			}
		},
	});

	return (
		<S.Button ref={refButton}>
			<Icon iconName={iconName} />
		</S.Button>
	);
};
