import { IColor, ISize } from "@src/themes/Theme.types";
import styled from "styled-components";

const sizes: { [K in ISize]: string } = {
	xs: "50%",
	s: "80%",
	m: "100%",
	l: "120%",
	xl: "150%",
};

export const Container = styled.div<{ $size: ISize; $color: IColor; $bgcolor: IColor }>`
	color: ${({ theme, $color }) => theme.color[$color]};
	background-color: ${({ theme, $bgcolor }) => theme.color[$bgcolor]};
	font-size: ${({ $size }) => sizes[$size]};
`;
