import type { Theme } from "@src/theme/Theme.types";
import styled from "styled-components";
import type { IDirection } from "./Space.types";

export const Space = styled.div<{ $size: keyof Theme["size"]; $direction: IDirection }>`
	width: ${(props) => (props.$direction === "horizontal" ? props.theme.size[props.$size] : "100%")};
	height: ${(props) => (props.$direction === "vertical" ? props.theme.size[props.$size] : "100%")};
`;
