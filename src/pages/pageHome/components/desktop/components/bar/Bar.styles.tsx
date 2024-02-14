import styled from "styled-components";

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

export const IconClose = styled.div<{ $isVisible: boolean }>`
	position: absolute;
	width: 4rem;
	height: 4rem;
	top: 0rem;
	left: 0rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	border-radius: 50%;
	color: ${(props) => props.theme.color.normalFg};
	transition: all 0.3s ease;

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
	}

	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	cursor: ${({ $isVisible }) => ($isVisible ? "pointer" : "none")};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "" : "none")};
`;

export const IconTheme = styled.div`
	position: absolute;
	width: 4rem;
	height: 4rem;
	bottom: 0rem;
	right: 0rem;

	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;

	border-radius: 50%;
	color: ${(props) => props.theme.color.normalFg};
	transition: all 0.3s ease;

	cursor: pointer;

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
	color: ${(props) => props.theme.color.normalFg};
	transition: all 0.3s ease;

	color: ${(props) => props.theme.color.successBg};
	white-space: nowrap;
`;

export const Success = styled.div`
	color: ${(props) => props.theme.color.successBg};
`;

export const Error = styled.div`
	color: ${(props) => props.theme.color.errorBg};
`;
