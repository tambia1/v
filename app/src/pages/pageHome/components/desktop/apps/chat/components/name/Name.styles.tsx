import styled from "styled-components";
import ImageBgLight from "@apps/chat/assets/bgLight.png";
import ImageBgDark from "@apps/chat/assets/bgDark.png";
import { ITheme } from "@src/theme/Theme.types";

const BgImages: { [K in ITheme["themeName"]]: string } = {
	light: ImageBgLight,
	dark: ImageBgDark,
};

export const Name = styled.div`
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
