import React from "react";
import * as S from "./Button.styles";

interface Props extends React.ComponentPropsWithoutRef<"button"> {}

export const Button = (props: Props) => {
	return (
		<S.Button className={props.className} onClick={(e) => props.onClick?.(e)} disabled={props.disabled}>
			{props.children}
		</S.Button>
	);
};
