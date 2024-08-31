import styled from "styled-components";
import ImageBgLight from "./components/talk/assets/bgLight.png";
import ImageBgDark from "./components/talk/assets/bgDark.png";
import { ITheme } from "@src/theme/Theme.types";
import imageAvatar0 from "./../../../../assets/avatar0.png";
import imageAvatar1 from "./../../../../assets/avatar1.png";
import imageAvatar2 from "./../../../../assets/avatar2.png";
import imageAvatar3 from "./../../../../assets/avatar3.png";

const BgImages: { [K in ITheme["themeName"]]: string } = {
	light: ImageBgLight,
	dark: ImageBgDark,
};

export const Page = styled.div`
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
	color: ${(props) => props.theme.color.normalFg};
`;

export const ClientId = styled.span`
	color: ${(props) => props.theme.color.normalFgDisabled};
`;

const avatars = [imageAvatar0, imageAvatar1, imageAvatar2, imageAvatar3];

export const ClientAvatar = styled.div<{ $avatarIndex: number }>`
	width: 2rem;
	height: 2rem;
	background-size: contain;
	background-repeat: no-repeat;
	background-image: url(${(props) => avatars[props.$avatarIndex]});
`;
