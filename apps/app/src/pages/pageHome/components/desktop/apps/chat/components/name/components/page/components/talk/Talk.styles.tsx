import styled from "styled-components";
import ImageBgLight from "./assets/bgLight.png";
import ImageBgDark from "./assets/bgDark.png";
import { ITheme } from "@src/theme/Theme.types";

const BgImages: { [K in ITheme["themeName"]]: string } = {
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
