import { Size } from "@src/themes/Theme.types";
import styled from "styled-components";

const sizes: { [K in Size]: { width: string; height: string } } = {
	xs: { width: "1.0rem", height: "1.0rem" },
	s: { width: "1.5rem", height: "1.5rem" },
	m: { width: "2.0rem", height: "2.0rem" },
	l: { width: "2.5rem", height: "2.5rem" },
	xl: { width: "3.0rem", height: "3.0rem" },
};

export const Icon = styled.div<{ size: Size }>`
	width: ${({ size }) => sizes[size].width};
	height: ${({ size }) => sizes[size].height};

	& > div {
		width: 100%;
		height: 100%;
	}

	& > div > div {
		width: 100%;
		height: 100%;
		display: flex;
	}

	& > div > div > svg {
		width: 100%;
		height: 100%;
	}
`;
