import styled, { css } from "styled-components";

export const Container = styled.div`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 100%;
	display: flex;
	flex-shrink: 0;
	background-color: ${(props) => props.theme.color.primary100};
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

	color: ${(props) => props.theme.color.primary800};
	transition: all 0.3s ease;

	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	cursor: ${({ $isVisible }) => ($isVisible ? "pointer" : "none")};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "" : "none")};

	& svg {
		stroke: ${(props) => props.theme.color.primary800};
		fill: ${(props) => props.theme.color.primary100};
	}

	&:hover{
		color: ${(props) => props.theme.color.primary400};
		background-color: ${(props) => props.theme.color.primary600};
	}
`;

export const IconDone = styled.div<{ $isVisible: boolean }>`
	${Icon}
	left: 0rem;

	& svg {
		stroke: ${(props) => props.theme.color.success500};
		fill: transparent;
	}
`;

export const IconCancel = styled.div<{ $isVisible: boolean }>`
	${Icon}
	right: 0rem;

	& svg {
		stroke: ${(props) => props.theme.color.danger500};
		fill: transparent;
	}
`;
