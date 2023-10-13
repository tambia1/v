import { ISize } from "@src/theme/Theme.types";
import styled from "styled-components";
import { FlagName, Flags } from "./Flag.types";

const sizes: { [K in ISize]: { width: string; height: string } } = {
	xs: { width: "1.0rem", height: "1.0rem" },
	s: { width: "1.5rem", height: "1.5rem" },
	m: { width: "2.0rem", height: "2.0rem" },
	l: { width: "2.5rem", height: "2.5rem" },
	xl: { width: "3.0rem", height: "3.0rem" },
};

export const Flag = styled.div<{ $size: ISize; $flagName: FlagName }>`
	width: ${({ $size: size }) => sizes[size].width};
	height: ${({ $size: size }) => sizes[size].height};
	background-image: url(${({ $flagName }) => Flags[$flagName]});
	background-size: 100% 100%;
`;
