import styled from "styled-components";
import { backgroundImages } from "../../apps/settings/page/components/theme/Theme.styles";

export type IBarPosition = "top" | "bottom" | "left" | "right";

const PAGE_BAR_SIZE = "4rem";

export const Apps = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: block;
	gap: 0.5rem;
	color: ${(props) => props.theme.color.normalFg};
	opacity: 0;
`;

export const AppsContainer = styled.div`
	width: auto;
	height: 100%;
	padding: 1rem;
`;

export const Bar = styled.div`
	overflow: hidden;
	position: absolute;
	width: 100%;
	height: 5rem;
	display: flex;
	flex-shrink: 0;
	background-color: ${(props) => props.theme.color.normalBg};
	z-index: 1;
	opacity: 0;
`;

export const Home = styled.div<{ $barPosition: IBarPosition; $backgroundImageIndex: number }>`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	position: relative;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
	background-image: url(${(props) => backgroundImages[props.$backgroundImageIndex][props.theme.themeName]});
	background-size: cover;
	background-position: 50%;

	& ${Apps} {
		width: ${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? `calc(100% - ${PAGE_BAR_SIZE})` : `100%`)};
		height: ${({ $barPosition }) => ($barPosition === "top" || $barPosition === "bottom" ? `calc(100% - ${PAGE_BAR_SIZE})` : `100%`)};

		left: ${({ $barPosition }) => ($barPosition === "left" ? PAGE_BAR_SIZE : 0)};
		top: ${({ $barPosition }) => ($barPosition === "top" ? PAGE_BAR_SIZE : 0)};

		opacity: 1;

		transition: all 0.3s ease;
	}

	& ${Bar} {
		width: ${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? `${PAGE_BAR_SIZE}` : `100%`)};
		height: ${({ $barPosition }) => ($barPosition === "top" || $barPosition === "bottom" ? `${PAGE_BAR_SIZE}` : `100%`)};

		top: ${({ $barPosition }) => ($barPosition === "top" ? 0 : $barPosition === "bottom" ? `calc(100% - ${PAGE_BAR_SIZE})` : 0)};
		left: ${({ $barPosition }) => ($barPosition === "left" ? 0 : $barPosition === "right" ? `calc(100% - ${PAGE_BAR_SIZE})` : 0)};

		opacity: 1;

		transition: all 0.3s ease;
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
