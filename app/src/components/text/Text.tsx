import type { Theme } from "@src/theme/Theme.types";
import type { ReactNode } from "react";
import * as S from "./Text.styles";

export type Props = {
	className?: string;
	children?: ReactNode;
	color?: keyof Theme["color"];
	bgcolor?: keyof Theme["color"];
	variant?: keyof Theme["font"];
};

export const Text = ({ className, children, color = "currentColor", bgcolor = "transparent", variant = "body", ...rest }: Props) => {
	return (
		<S.Text className={className} $color={color} $bgcolor={bgcolor} $variant={variant} {...rest}>
			{children}
		</S.Text>
	);
};
