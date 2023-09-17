import { Size } from "@src/types/Sizes";
import styled from "styled-components";

const sizes: { [K in Size]: { width: string; height: string } } = {
	xs: { width: "0.8rem", height: "0.8rem" },
	s: { width: "1rem", height: "1rem" },
	m: { width: "1.2rem", height: "1.2rem" },
	l: { width: "1.4rem", height: "1.2rem" },
	xl: { width: "1.8rem", height: "1.8rem" },
};

export const Container = styled.div<{ size: Size }>`
	width: ${({ size }) => sizes[size].width};
	height: ${({ size }) => sizes[size].height};

	& svg {
		width: 100%;
		height: 100%;
	}
`;
