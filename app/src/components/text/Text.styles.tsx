import type { ITheme } from "@src/theme/Theme.types";
import styled from "styled-components";

export const Text = styled.div<{
	$color: keyof ITheme["color"];
	$bgcolor: keyof ITheme["color"];
	$variant: keyof ITheme["font"];
}>`
	color: ${(props) => props.theme.color[props.$color]};
	background-color: ${(props) => props.theme.color[props.$bgcolor]};
	font-size: ${(props) => props.theme.font[props.$variant].size};
	font-weight: ${(props) => props.theme.font[props.$variant].weight};
`;
