import { ITheme } from "@src/themes/Theme.types";
import { Size } from "@src/types/Sizes";
import styled from "styled-components";

const sizes: { [K in Size]: string } = {
	xs: "50%",
	s: "80%",
	m: "100%",
	l: "120%",
	xl: "150%",
};

export const Container = styled.div<{ $size: Size; $color: string; $bgcolor: string }>`
	color: ${({ $color }) => $color};
	background-color: ${({ $bgcolor }) => $bgcolor};
	font-size: ${({ $size }) => sizes[$size]};
`;
