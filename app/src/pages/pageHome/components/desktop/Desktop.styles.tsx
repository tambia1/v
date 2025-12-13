import styled from "@emotion/styled";
import { backgroundImages } from "@src/pages/pageHome/components/desktop/apps/settings/components/page/components/themes/Themes.styles";

export type BarPosition = "top" | "bottom" | "left" | "right";

const PAGE_BAR_SIZE = "5rem";

export const Apps = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: inline-grid;
	gap: 0.5rem;
	color: ${(props) => props.theme.color.primary800};
	opacity: 0;
`;

export const AppsContainer = styled.div`
	width: auto;
	height: auto;
	position: relative;
	z-index: 0;
`;

export const AppGroup = styled.div`
	position: absolute;
	inset: 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
	align-content: start;
`;

export const AppContainer = styled.div`
	position: absolute;
	inset: 0 0 0 0;
	pointer-events: none;
	z-index: 1;

	backdrop-filter: blur(0.5rem);
`;

export const App = styled.div`
	position: absolute;
	inset: 0 0 0 0;
	z-index: 1;
`;

export const Bar = styled.div`
	position: absolute;
	width: 100%;
	height: auto;
	z-index: 1;
	opacity: 0;
`;

export const Container = styled.div<{ $barPosition: BarPosition; $backgroundImageIndex: number }>`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	position: relative;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};
	background-image: url(${(props) => backgroundImages[props.$backgroundImageIndex][props.theme.themeName]});
	background-size: cover;
	background-position: 50%;

	& ${Apps} {
		width: ${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? `calc(100% - ${PAGE_BAR_SIZE})` : "100%")};
		height: ${({ $barPosition }) => ($barPosition === "top" || $barPosition === "bottom" ? `calc(100% - ${PAGE_BAR_SIZE})` : "100%")};

		left: ${({ $barPosition }) => ($barPosition === "left" ? PAGE_BAR_SIZE : 0)};
		top: ${({ $barPosition }) => ($barPosition === "top" ? PAGE_BAR_SIZE : 0)};

		opacity: 1;

		transition: all 0.3s ease;
	}

	& ${Bar} {
		width: ${({ $barPosition }) => ($barPosition === "left" || $barPosition === "right" ? `${PAGE_BAR_SIZE}` : "100%")};
		height: ${({ $barPosition }) => ($barPosition === "top" || $barPosition === "bottom" ? `${PAGE_BAR_SIZE}` : "100%")};

		top: ${({ $barPosition }) => ($barPosition === "top" ? 0 : $barPosition === "bottom" ? `calc(100% - ${PAGE_BAR_SIZE})` : 0)};
		left: ${({ $barPosition }) => ($barPosition === "left" ? 0 : $barPosition === "right" ? `calc(100% - ${PAGE_BAR_SIZE})` : 0)};

		opacity: 1;

		transition: all 0.3s ease;
	}
`;
