import React from "react";
import * as S from "./Button.styles";

interface Props {
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	disabled?: boolean;
	children?: React.ReactNode;
}

export const Button = (props: Props) => {
	return (
		<S.Button className={props.className} onClick={(e) => props.onClick?.(e)} disabled={props.disabled}>
			{props.children}
		</S.Button>
	);
};
