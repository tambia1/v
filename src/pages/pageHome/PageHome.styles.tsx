import styled from "styled-components";

export type IPageBarPosition = "top" | "bottom" | "left" | "right";

const PAGE_BAR_SIZE = "5rem";

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
	align-items: center;
	background-color: ${(props) => props.theme.color.normalBg};
	background-color: red;
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

		left: ${({ $pageBarPosition }) => ($pageBarPosition === "left" ? PAGE_BAR_SIZE : "unset")};
		right: ${({ $pageBarPosition }) => ($pageBarPosition === "right" ? 0 : "unset")};
		top: ${({ $pageBarPosition }) => ($pageBarPosition === "top" ? PAGE_BAR_SIZE : "unset")};
		bottom: ${({ $pageBarPosition }) => ($pageBarPosition === "bottom" ? 0 : "unset")};
	}

	& ${PageBar} {
		width: ${({ $pageBarPosition }) => ($pageBarPosition === "left" || $pageBarPosition === "right" ? `${PAGE_BAR_SIZE}` : `100%`)};
		height: ${({ $pageBarPosition }) => ($pageBarPosition === "top" || $pageBarPosition === "bottom" ? `${PAGE_BAR_SIZE}` : `100%`)};

		top: ${({ $pageBarPosition }) => ($pageBarPosition === "top" ? 0 : "unset")};
		bottom: ${({ $pageBarPosition }) => ($pageBarPosition === "bottom" ? 0 : "unset")};
		left: ${({ $pageBarPosition }) => ($pageBarPosition === "left" ? 0 : "unset")};
		right: ${({ $pageBarPosition }) => ($pageBarPosition === "right" ? 0 : "unset")};
	}
`;

export const ThemeMode = styled.div`
	bottom: 1rem;
	right: 1rem;
	margin: 1rem;
	display: flex;
	flex-shrink: 0;
	gap: 1rem;
	align-items: center;
	justify-content: center;
`;

export const Version = styled.div`
	bottom: 1rem;
	left: 1rem;
	margin: 1rem;
	flex-shrink: 0;
	color: ${(props) => props.theme.color.normalFg};
`;

export const PageBarButton = styled.div<{ $isVisible: boolean }>`
	width: 4rem;
	height: 4rem;
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	margin-left: 1rem;
	border-radius: 50%;
	color: ${(props) => props.theme.color.normalFg};
	transition: all 0.3s ease;
	opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
	cursor: ${({ $isVisible }) => ($isVisible ? "pointer" : "none")};
	pointer-events: ${({ $isVisible }) => ($isVisible ? "" : "none")};

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
	}
`;

export const PageBarSeparator = styled.div`
	width: 100%;
	height: 100%;
`;
