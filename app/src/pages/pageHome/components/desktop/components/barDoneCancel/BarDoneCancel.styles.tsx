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
	width: 4rem;
	height: 4rem;
	margin: 0.5rem;
	border-radius: 0.5rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	color: ${(props) => props.theme.color.primaryFg};
	transition: all 0.3s ease;

	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	cursor: ${({ $isVisible }) => ($isVisible ? "pointer" : "none")};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "" : "none")};

	& svg {
		stroke: ${(props) => props.theme.color.primaryFg};
		fill: ${(props) => props.theme.color.primaryBg};
	}

	&:hover{
		color: ${(props) => props.theme.color.primaryFgHover};
		background-color: ${(props) => props.theme.color.primaryBgHover};
	}
`;

export const IconDone = styled.div<{ $isVisible: boolean }>`
	${Icon}
	left: 0rem;

	& svg {
		stroke: ${(props) => props.theme.color.successFg};
	}
`;

export const IconCancel = styled.div<{ $isVisible: boolean }>`
	${Icon}
	right: 0rem;

	& svg {
		stroke: ${(props) => props.theme.color.errorFg};
	}
`;
