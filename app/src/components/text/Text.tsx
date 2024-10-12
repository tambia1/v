import type { ITheme } from "@src/theme/Theme.types";
import type { ReactNode } from "react";
import * as S from "./Text.styles";

export interface Props {
	className?: string;
	children?: ReactNode;
	size?: keyof ITheme["size"];
	color?: keyof ITheme["color"];
	bgcolor?: keyof ITheme["color"];
}

export const Text = ({ className, children, size = "m", color = "normalFg", bgcolor = "transparent", ...rest }: Props) => {
	return (
		<S.Text className={className} $size={size} $color={color} $bgcolor={bgcolor} {...rest}>
			{children}
		</S.Text>
	);
};
