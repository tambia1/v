import type { ITheme } from "@src/theme/Theme.types";
import styled from "styled-components";

const sizes: { [K in keyof ITheme["size"]]: string } = {
	xs: "0.5rem",
	s: "1rem",
	m: "2rem",
	l: "3rem",
	xl: "4rem",
};

export const Space = styled.div<{ $size: keyof ITheme["size"] }>`
	width: 100%;
	height: ${({ $size }) => sizes[$size]};
`;
