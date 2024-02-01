import { ITheme } from "@src/theme/Theme.types";
import styled from "styled-components";

const sizes: { [K in keyof ITheme["size"]]: string } = {
	xs: "50%",
	s: "80%",
	m: "100%",
	l: "120%",
	xl: "150%",
};

export const Container = styled.div<{ $size?: keyof ITheme["size"]; $color?: keyof ITheme["color"]; $bgcolor?: keyof ITheme["color"] }>`
	color: ${({ theme, $color }) => ($color ? theme.color[$color] : "inherit")};
	background-color: ${({ theme, $bgcolor }) => ($bgcolor ? theme.color[$bgcolor] : "inherit")};
	font-size: ${({ $size }) => sizes[$size || "m"]};
`;
