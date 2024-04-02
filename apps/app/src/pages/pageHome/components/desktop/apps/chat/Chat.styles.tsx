import styled from "styled-components";
import ImageBgLight from "./assets/bgLight.png";
import ImageBgDark from "./assets/bgDark.png";
import { ITheme } from "@src/theme/Theme.types";

const BgImages: { [K in ITheme["themeName"]]: string } = {
	light: ImageBgLight,
	dark: ImageBgDark,
};

export const Chat = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBg};
`;

export const Write = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-image: url(${(props) => BgImages[props.theme.themeName]});
	background-position: 50%;
	background-size: cover;
`;
