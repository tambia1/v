import styled, { css } from "styled-components";

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
	width: 3rem;
	height: 3rem;
	top: 0rem;

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

export const IconDone = styled.div<{ $isVisible: boolean }>`
	${Icon}
	left: 0rem;

	& svg {
		stroke: ${(props) => props.theme.color.successFg};
	}

	&:active {
		opacity: 0.5;
	}
`;

export const IconCancel = styled.div<{ $isVisible: boolean }>`
	${Icon}
	right: 0rem;

	& svg {
		stroke: ${(props) => props.theme.color.errorFg};
	}

	&:active {
		opacity: 0.5;
	}
`;
