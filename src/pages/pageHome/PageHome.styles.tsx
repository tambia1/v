import styled from "styled-components";

export type IAppBarPosition = "top" | "bottom" | "left" | "right";

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

export const AppBar = styled.div`
	overflow: hidden;
	position: absolute;
	width: 100%;
	height: 5rem;
	display: flex;
	flex-shrink: 0;
	background-color: ${(props) => props.theme.color.normalBg};
	z-index: 1;
	transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, bottom 0.3s ease, left 0.3s ease, right 0.3s ease;
`;

export const PageHome = styled.div<{ $appBarPosition: IAppBarPosition }>`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	position: relative;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};

	& ${Apps} {
		width: ${({ $appBarPosition }) => ($appBarPosition === "left" || $appBarPosition === "right" ? `calc(100% - ${PAGE_BAR_SIZE})` : `100%`)};
		height: ${({ $appBarPosition }) => ($appBarPosition === "top" || $appBarPosition === "bottom" ? `calc(100% - ${PAGE_BAR_SIZE})` : `100%`)};

		left: ${({ $appBarPosition }) => ($appBarPosition === "left" ? PAGE_BAR_SIZE : 0)};
		top: ${({ $appBarPosition }) => ($appBarPosition === "top" ? PAGE_BAR_SIZE : 0)};
	}

	& ${AppBar} {
		width: ${({ $appBarPosition }) => ($appBarPosition === "left" || $appBarPosition === "right" ? `${PAGE_BAR_SIZE}` : `100%`)};
		height: ${({ $appBarPosition }) => ($appBarPosition === "top" || $appBarPosition === "bottom" ? `${PAGE_BAR_SIZE}` : `100%`)};

		top: ${({ $appBarPosition }) => ($appBarPosition === "top" ? 0 : $appBarPosition === "bottom" ? `calc(100% - ${PAGE_BAR_SIZE})` : 0)};
		left: ${({ $appBarPosition }) => ($appBarPosition === "left" ? 0 : $appBarPosition === "right" ? `calc(100% - ${PAGE_BAR_SIZE})` : 0)};
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
