import styled from "styled-components";

export type IPageBarPosition = "top" | "bottom" | "left" | "right";

const PAGE_BAR_SIZE = "4rem";

export const Apps = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: block;
	gap: 0.5rem;
	color: ${(props) => props.theme.color.normalFg};
	transition: all ease 0.3s;
`;

export const PageBar = styled.div`
	overflow: hidden;
	position: absolute;
	width: 100%;
	height: 5rem;
	display: flex;
	flex-shrink: 0;
	background-color: ${(props) => props.theme.color.normalBg};
	z-index: 1;
	transition: all ease 0.3s;
`;

export const PageHome = styled.div<{ $pageBarPosition: IPageBarPosition }>`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	position: relative;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};

	& ${Apps} {
		width: ${({ $pageBarPosition }) => ($pageBarPosition === "left" || $pageBarPosition === "right" ? `calc(100% - ${PAGE_BAR_SIZE})` : `100%`)};
		height: ${({ $pageBarPosition }) => ($pageBarPosition === "top" || $pageBarPosition === "bottom" ? `calc(100% - ${PAGE_BAR_SIZE})` : `100%`)};

		left: ${({ $pageBarPosition }) => ($pageBarPosition === "left" ? PAGE_BAR_SIZE : 0)};
		top: ${({ $pageBarPosition }) => ($pageBarPosition === "top" ? PAGE_BAR_SIZE : 0)};
	}

	& ${PageBar} {
		width: ${({ $pageBarPosition }) => ($pageBarPosition === "left" || $pageBarPosition === "right" ? `${PAGE_BAR_SIZE}` : `100%`)};
		height: ${({ $pageBarPosition }) => ($pageBarPosition === "top" || $pageBarPosition === "bottom" ? `${PAGE_BAR_SIZE}` : `100%`)};

		top: ${({ $pageBarPosition }) => ($pageBarPosition === "top" ? 0 : $pageBarPosition === "bottom" ? `calc(100% - ${PAGE_BAR_SIZE})` : 0)};
		left: ${({ $pageBarPosition }) => ($pageBarPosition === "left" ? 0 : $pageBarPosition === "right" ? `calc(100% - ${PAGE_BAR_SIZE})` : 0)};
	}
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

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
	}
`;
