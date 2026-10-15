import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyles = css`
	body {
		--scrollbarColor: #cfd8dc;
		--thumbColor: #90a4ae;

		& *::-webkit-scrollbar {
			width: 5px;
			border-radius: 5px;
		}

		& *::-webkit-scrollbar-track {
			background-color: var(--scrollbarColor);
			border-radius: 5px;
		}

		& *::-webkit-scrollbar-thumb {
			background-color: var(--thumbColor);
			border-radius: 5px;
		}
	}

	ul {
		padding-left: 2rem;
	}
`;

export const AnimationShowFrames = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`;

export const AnimationShow = css`
	animation-name: ${AnimationShowFrames};
	animation-duration: 0.5s;
	animation-timing-function: ease;
	animation-fill-mode: both;
`;

export const AnimationHideFrames = keyframes`
	0% { opacity: 1; }
	100% { opacity: 0; }
`;

export const AnimationHide = css`
	animation-name: ${AnimationHideFrames};
	animation-duration: 0.5s;
	animation-timing-function: ease;
	animation-fill-mode: both;
`;

export const Flex = styled.div<{
	dir: "col" | "row";
	width: "auto" | `${number}%` | `${number}rem` | number;
	height: "auto" | `${number}%` | `${number}rem` | number;
	$minWidth?: "auto" | `${number}%` | `${number}rem` | number;
	$maxWidth?: "auto" | `${number}%` | `${number}rem` | number;
	$minHeight?: "auto" | `${number}%` | `${number}rem` | number;
	$maxHeight?: "auto" | `${number}%` | `${number}rem` | number;
	$gap?: number | `${number}rem`;
	overflowX?: "hidden" | "scroll" | "auto";
	overflowY?: "hidden" | "scroll" | "auto";
	shrink?: number;
}>`
	display: flex;
	flex-direction: ${({ dir }) => (dir === "col" ? "column" : "row")};
	flex-shrink: ${({ shrink = 1 }) => shrink};
	gap: ${({ $gap = 0 }) => $gap};
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	min-width: ${({ $minWidth }) => $minWidth};
	min-height: ${({ $minHeight }) => $minHeight};
	max-width: ${({ $maxWidth }) => $maxWidth};
	max-height: ${({ $maxHeight }) => $maxHeight};
	overflow-x: ${({ overflowX = "auto" }) => overflowX};
	overflow-y: ${({ overflowY = "auto" }) => overflowY};
`;
