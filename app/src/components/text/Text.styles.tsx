import type { ITheme } from "@src/theme/Theme.types";
import styled from "styled-components";

export const Text = styled.div<{
	$color: keyof ITheme["color"];
	$bgcolor: keyof ITheme["color"];
	$fontSize: keyof ITheme["fontSize"];
	$fontWeight: keyof ITheme["fontWeight"];
}>`
	color: ${(props) => props.theme.color[props.$color]};
	background-color: ${(props) => props.theme.color[props.$bgcolor]};
	font-size: ${(props) => props.theme.fontSize[props.$fontSize]};
	font-weight: ${(props) => props.theme.fontWeight[props.$fontWeight]};
`;
