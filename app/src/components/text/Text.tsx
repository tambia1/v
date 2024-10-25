import type { ITheme } from "@src/theme/Theme.types";
import type { ReactNode } from "react";
import * as S from "./Text.styles";

export interface Props {
	className?: string;
	children?: ReactNode;
	color?: keyof ITheme["color"];
	bgcolor?: keyof ITheme["color"];
	variant?: keyof ITheme["font"];
}

export const Text = ({ className, children, color = "primaryFg", bgcolor = "transparent", variant = "body", ...rest }: Props) => {
	return (
		<S.Text className={className} $color={color} $bgcolor={bgcolor} $variant={variant} {...rest}>
			{children}
		</S.Text>
	);
};
