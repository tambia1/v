import styled, { css } from "styled-components";
import type { IBarPosition } from "../../Desktop.styles";

export const Container = styled.div`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 100%;
	display: flex;
	flex-shrink: 0;
	background-color: ${(props) => props.theme.color.primaryBg};
`;

const Icon = css<{ $isVisible: boolean }>`
	position: absolute;
	width: 4rem;
	height: 4rem;

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
	${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? `bottom: 0rem;` : `left: 0rem`)};

	& svg {
		fill: ${(props) => props.theme.color.errorBg};
	}

	&:active {
		opacity: 0.5;
	}
`;

export const IconTheme = styled.div<{ $isVisible: boolean; $barPosition: IBarPosition }>`
	${Icon}
	${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? `top: 0rem;` : `right: 0rem`)};

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
	color: ${(props) => props.theme.color.successFg};
`;

export const Error = styled.div`
	color: ${(props) => props.theme.color.errorFg};
`;
