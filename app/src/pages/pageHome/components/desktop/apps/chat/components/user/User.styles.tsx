import ImageBgDark from "@apps/chat/assets/bgDark.png";
import ImageBgLight from "@apps/chat/assets/bgLight.png";
import type { ITheme } from "@src/theme/Theme.types";
import styled from "styled-components";

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

export const PagingContainer = styled.div`
	overflow: hidden;
	background-position: 0px 0px;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;

	height: 15rem;
	top: 10rem;
	border-radius: 1rem;

	background-color: #00000033;

	margin: 2rem;
`;

export const PagingItem = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;
