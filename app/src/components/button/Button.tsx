import React from "react";
import * as S from "./Button.styles";

export type IVariant = "styled" | "full" | "stroke" | "link";

export interface Props extends React.ComponentPropsWithoutRef<"button"> {
	className?: string | undefined;
	variant?: IVariant;
}

export const Button = ({ className, children, variant: varian = "styled", ...rest }: Props) => {
	return (
		<S.Button className={className} $variant={varian} {...rest}>
			{children}
		</S.Button>
	);
};
