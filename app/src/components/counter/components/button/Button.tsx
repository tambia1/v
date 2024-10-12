import { Icon } from "@src/components/icon/Icon";
import type { IIconName } from "@src/components/icon/Icon.types";
import { type ITouch, useTouch } from "@src/hooks/UseTouch";
import { useRef } from "react";
import * as S from "./Button.styles";

type Props = {
	iconName: IIconName;
	onClick: () => void;
};

export const Button = ({ iconName, onClick }: Props) => {
	const refButton = useRef<HTMLDivElement>(null);

	useTouch({
		ref: refButton,
		onTouch: ({ status }: ITouch) => {
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
