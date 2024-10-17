import type { ITheme } from "@src/theme/Theme.types";
import styled from "styled-components";
import ImageBgDark from "./components/talk/assets/bgDark.png";
import ImageBgLight from "./components/talk/assets/bgLight.png";

const BgImages: { [K in ITheme["themeName"]]: string } = {
	light: ImageBgLight,
	dark: ImageBgDark,
};

export const Talks = styled.div`
	width: auto;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-image: url(${(props) => BgImages[props.theme.themeName]});
	background-position: 50%;
	background-size: cover;
`;

export const ClientName = styled.span`
	color: ${(props) => props.theme.color.primaryFg};
`;

export const ClientId = styled.span`
	color: ${(props) => props.theme.color.primaryFgDisabled};
`;
