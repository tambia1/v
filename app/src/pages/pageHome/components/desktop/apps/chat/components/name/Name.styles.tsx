import styled, { css } from "styled-components";
import ImageBgLight from "@apps/chat/assets/bgLight.png";
import ImageBgDark from "@apps/chat/assets/bgDark.png";
import { ITheme } from "@src/theme/Theme.types";
import imageAvatar0 from "./../../assets/avatar0.png";
import imageAvatar1 from "./../../assets/avatar1.png";
import imageAvatar2 from "./../../assets/avatar2.png";
import imageAvatar3 from "./../../assets/avatar3.png";

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

export const PagingItem = css`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50%;
`;

export const PagingItem0 = styled.div`
	${PagingItem}
	background-image: url(${imageAvatar0});
`;

export const PagingItem1 = styled.div`
	${PagingItem}
	background-image: url(${imageAvatar1});
`;

export const PagingItem2 = styled.div`
	${PagingItem}
	background-image: url(${imageAvatar2});
`;

export const PagingItem3 = styled.div`
	${PagingItem}
	background-image: url(${imageAvatar3});
`;
