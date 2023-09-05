import React from "react";
import * as S from "./Button.styles";

interface Props {
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
	children?: React.ReactNode;
}

export const Button = (props: Props) => {
	return (
		<S.Button className={props.className} onClick={props.onClick} disabled={props.disabled}>
			{props.children}
		</S.Button>
	);
};
