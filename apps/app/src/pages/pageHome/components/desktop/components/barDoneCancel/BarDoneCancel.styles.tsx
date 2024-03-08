import styled, { css } from "styled-components";

export const Container = styled.div`
	position: absolute;
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

export const IconDone = styled.div<{ $isVisible: boolean }>`
	${Icon}
	left: 0rem;

	& svg {
		stroke: ${(props) => props.theme.color.successBg};
	}

	&:active {
		opacity: 0.5;
	}
`;

export const IconCancel = styled.div<{ $isVisible: boolean }>`
	${Icon}
	left: 4rem;

	& svg {
		stroke: ${(props) => props.theme.color.errorBg};
	}

	&:active {
		opacity: 0.5;
	}
`;
