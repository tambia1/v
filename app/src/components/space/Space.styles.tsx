import styled from "@emotion/styled";
import type { Theme } from "@src/theme/Theme.types";
import type { Direction } from "./Space.types";

export const Space = styled.div<{ $size: keyof Theme["size"]; $direction: Direction }>`
	width: ${(props) => (props.$direction === "horizontal" ? props.theme.size[props.$size] : "100%")};
	height: ${(props) => (props.$direction === "vertical" ? props.theme.size[props.$size] : "100%")};
`;
