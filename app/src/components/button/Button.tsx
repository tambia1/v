import { type ITouch, useTouch } from "@src/hooks/UseTouch";
import type { ITheme } from "@src/theme/Theme.types";
import type { ComponentProps } from "react";
import * as S from "./Button.styles";

export type IVariant = "styled" | "full" | "stroke" | "link" | "text" | "none";

export type Props = ComponentProps<"button"> & {
	className?: string;
	variant?: IVariant;
	onLongClick?: (e: TouchEvent | MouseEvent) => void;
	size?: keyof ITheme["size"];
};

export const Button = ({ className, children, variant = "styled", size = "m", onLongClick, ref, ...rest }: Props) => {
	useTouch({
		ref: ref,
		onTouch: ({ status, e }: ITouch) => {
			if (status === "long") {
				onLongClick?.(e);
			}
		},
	});

	return (
		<S.Button ref={ref} className={className} $variant={variant} $width={size} {...rest}>
			{children}
		</S.Button>
	);
};
