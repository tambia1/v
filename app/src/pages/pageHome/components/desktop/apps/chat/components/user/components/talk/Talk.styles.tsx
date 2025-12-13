import styled from "@emotion/styled";
import type { Theme } from "@src/theme/Theme.types";
import ImageBgDark from "./assets/bgDark.png";
import ImageBgLight from "./assets/bgLight.png";

const BgImages: { [K in Theme["themeName"]]: string } = {
	light: ImageBgLight,
	dark: ImageBgDark,
};

export const Talk = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-image: url(${(props) => BgImages[props.theme.themeName]});
	background-position: 50%;
	background-size: cover;
`;

export const Messages = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: 100%;
	padding: 1rem;
`;

export const Message = styled.div`
	display: flex;
`;
