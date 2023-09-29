import { Color, Size } from "@src/themes/Theme.types";
import styled from "styled-components";

const sizes: { [K in Size]: string } = {
	xs: "50%",
	s: "80%",
	m: "100%",
	l: "120%",
	xl: "150%",
};

export const Container = styled.div<{ $size: Size; $color: Color; $bgcolor: Color }>`
	color: ${({ theme, $color }) => theme.color[$color]};
	background-color: ${({ theme, $bgcolor }) => theme.color[$bgcolor]};
	font-size: ${({ $size }) => sizes[$size]};
`;
