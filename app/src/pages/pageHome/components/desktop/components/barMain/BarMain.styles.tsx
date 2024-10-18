import styled, { css } from "styled-components";
import type { IBarPosition } from "../../Desktop.styles";

export const BarMain = styled.div`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 100%;
	display: flex;
	flex-shrink: 0;
	background-color: ${(props) => props.theme.color.primaryBg};
	display: flex;
	align-items: center;
`;

const Icon = css<{ $isVisible: boolean }>`
	position: absolute;
	width: 1.5rem;
	height: 1.5rem;
	padding: 0.5rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	border-radius: 50%;
	color: ${(props) => props.theme.color.primaryFg};
	transition: all 0.3s ease;

	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	cursor: ${({ $isVisible }) => ($isVisible ? "pointer" : "none")};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "" : "none")};
`;

export const IconClose = styled.div<{ $isVisible: boolean; $barPosition: IBarPosition }>`
	${Icon}
	${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? "bottom: 0rem;" : "left: 0rem")};

	& svg {
		fill: ${(props) => props.theme.color.errorBg};
	}

	&:active {
		opacity: 0.5;
	}
`;

export const IconTheme = styled.div<{ $isVisible: boolean; $barPosition: IBarPosition }>`
	${Icon}
	${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? "top: 0rem;" : "right: 0rem")};

	& svg {
		fill: ${(props) => props.theme.color.primaryBg};
	}

	&:active {
		opacity: 0.5;
	}
`;

export const Username = styled.div`
	position: absolute;
	width: 4rem;
	height: 3rem;
	bottom: 0rem;
	right: 3rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	border-radius: 50%;
	transition: all 0.3s ease;
	white-space: nowrap;
`;

export const MessageSuccess = styled.div`
	color: ${(props) => props.theme.color.successFg};
`;

export const MessageError = styled.div`
	color: ${(props) => props.theme.color.errorFg};
`;
