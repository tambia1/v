import type { Theme } from "@src/theme/Theme.types";
import type { ReactNode } from "react";
import * as S from "./Text.styles";

export type Variant = "title" | "header" | "body" | "note";

export type Props = {
	className?: string;
	children?: ReactNode;

	color?: keyof Theme["color"];
	bgcolor?: keyof Theme["color"];
	font?: keyof Theme["font"];

	variant?: Variant;
};

export const Text = (props: Props) => {
	const variantMap: { [K in Variant]: { color: keyof Theme["color"]; bgcolor: keyof Theme["color"]; font: keyof Theme["font"] } } = {
		title: {
			color: "primary800",
			bgcolor: "transparent",
			font: "font800",
		},
		header: {
			color: "primary800",
			bgcolor: "transparent",
			font: "font600",
		},
		body: {
			color: "primary800",
			bgcolor: "transparent",
			font: "font400",
		},
		note: {
			color: "primary800",
			bgcolor: "transparent",
			font: "font200",
		},
	};

	const defaultVariant = "body";

	const color = props.color || variantMap[props.variant || defaultVariant].color;
	const bgcolor = props.bgcolor || variantMap[props.variant || defaultVariant].bgcolor;
	const font = props.font || variantMap[props.variant || defaultVariant].font;

	return (
		<S.Text className={props.className} $color={color} $bgcolor={bgcolor} $font={font}>
			{props.children}
		</S.Text>
	);
};
