import styled, { css } from "styled-components";

export type IBarPosition = "top" | "bottom" | "left" | "right";

export const PAGE_BAR_SIZE = "4rem";

export const Container = styled.div`
	overflow: hidden;
	width: 100%;
	height: 100%;
	display: flex;
	flex-shrink: 0;
	background-color: ${(props) => props.theme.color.normalBg};
`;

const Icon = css<{ $isVisible: boolean }>`
	position: absolute;
	width: 4rem;
	height: 4rem;
	top: 0rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	border-radius: 50%;
	color: ${(props) => props.theme.color.normalFg};
	transition: all 0.3s ease;

	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	cursor: ${({ $isVisible }) => ($isVisible ? "pointer" : "none")};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "" : "none")};
`;

export const IconClose = styled.div<{ $isVisible: boolean }>`
	${Icon}
	left: 0rem;

	& svg {
		fill: ${(props) => props.theme.color.errorBg};
	}

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
	}
`;

export const IconHide = styled.div<{ $isVisible: boolean }>`
	${Icon}
	left: 3rem;

	& svg {
		fill: ${(props) => props.theme.color.warningBg};
	}

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
	}
`;

export const IconMinimize = styled.div<{ $isVisible: boolean }>`
	${Icon}
	left: 6rem;

	& svg {
		fill: ${(props) => props.theme.color.successBg};
	}

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
	}
`;

export const IconTheme = styled.div<{ $isVisible: boolean }>`
	${Icon}
	right: 0rem;

	& svg {
		fill: ${(props) => props.theme.color.normalBg};
	}

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
	}
`;

export const Username = styled.div`
	position: absolute;
	width: 4rem;
	height: 4rem;
	bottom: 0rem;
	right: 5rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	border-radius: 50%;
	transition: all 0.3s ease;
	white-space: nowrap;
`;

export const Success = styled.div`
	color: ${(props) => props.theme.color.successBg};
`;

export const Error = styled.div`
	color: ${(props) => props.theme.color.errorBg};
`;

export const IconAction = styled.div<{ $isVisible: boolean }>`
	${Icon}
	left: 0rem;

	& svg {
		color: ${(props) => props.theme.color.accentBg};
	}

	&:active {
		color: ${(props) => props.theme.color.accentBgActive};
	}
`;
