import type { ITheme } from "@src/theme/Theme.types";
import type { ReactNode } from "react";
import * as S from "./Text.styles";

export interface Props {
	className?: string;
	children?: ReactNode;
	color?: keyof ITheme["color"];
	bgcolor?: keyof ITheme["color"];
	fontSize?: keyof ITheme["fontSize"];
	fontWeight?: keyof ITheme["fontWeight"];
}

export const Text = ({ className, children, color = "primaryFg", bgcolor = "transparent", fontSize = "body", fontWeight = "body", ...rest }: Props) => {
	return (
		<S.Text className={className} $color={color} $bgcolor={bgcolor} $fontSize={fontSize} $fontWeight={fontWeight} {...rest}>
			{children}
		</S.Text>
	);
};
