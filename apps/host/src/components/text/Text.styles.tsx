import styled from "@emotion/styled";
import type { Theme } from "@src/theme/Theme.types";

export const Text = styled.div<{
	$color: keyof Theme["color"];
	$bgcolor: keyof Theme["color"];
	$font: keyof Theme["font"];
}>`
	color: ${(props) => props.theme.color[props.$color]};
	background-color: ${(props) => props.theme.color[props.$bgcolor]};
	font-size: ${(props) => props.theme.font[props.$font].size};
	font-weight: ${(props) => props.theme.font[props.$font].weight};

	display: inline-flex;

	text-shadow:
		0 1px 1px rgb(0 0 0 / 0.2),
		0 3px 4px rgb(0 0 0 / 0.15),
		0 8px 12px rgb(0 0 0 / 0.11),
		0 16px 28px rgb(0 0 0 / 0.08),
		0 28px 50px rgb(0 0 0 / 0.06);
`;
