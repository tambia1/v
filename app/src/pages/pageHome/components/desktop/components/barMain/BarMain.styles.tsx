import styled, { css } from "styled-components";
import type { BarPosition } from "../../Desktop.styles";

export const BarMain = styled.div`
	position: absolute;
	overflow: hidden;
	width: 100%;
	height: 100%;
	display: flex;
	flex-shrink: 0;
	background-color: ${(props) => props.theme.color.primary100};
	display: flex;
	align-items: center;
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

export const IconClose = styled.div<{ $isVisible: boolean; $barPosition: BarPosition }>`
	${Icon}
	${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? "bottom: 0rem;" : "left: 0rem")};
`;

export const IconTheme = styled.div<{ $isVisible: boolean; $barPosition: BarPosition }>`
	${Icon}
	${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? "top: 0rem;" : "right: 0rem")};
`;

export const Username = styled.div`
	position: absolute;
	width: 4rem;
	right: 5rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	transition: all 0.3s ease;
	white-space: nowrap;
`;

export const MessageSuccess = styled.div`
	color: ${(props) => props.theme.color.success500};
`;

export const MessageError = styled.div`
	color: ${(props) => props.theme.color.danger500};
`;
