import styled, { css } from "styled-components";
import imageAboutDark from "./assets/about-dark.png";
import imageAboutLight from "./assets/about-light.png";
import imageLogoutDark from "./assets/logout-dark.png";
import imageLogoutLight from "./assets/logout-light.png";
import imageServerDark from "./assets/server-dark.png";
import imageServerLight from "./assets/server-light.png";
import imageThemeDark from "./assets/theme-dark.png";
import imageThemeLight from "./assets/theme-light.png";

export const imageCommon = css`
	display: inline-flex;
	width: 30px;
	height: 30px;
	background-size: contain;
	background-repeat: no-repeat;
	flex-shrink: 0;
	padding: 0.5rem;
	box-sizing: border-box;
	background-size: 80%;
	background-position: 50% 50%;
	border-radius: 0.5rem;
	background-color: ${({ theme }) => theme.backgroundColors.tertiary};
`;

export const ImageServer = styled.div`
	${imageCommon}
	background-image: url(${({ theme }) => (theme.themeName === "themeLight" ? imageServerLight : imageServerDark)});
`;

export const ImageTheme = styled.div`
	${imageCommon}
	background-image: url(${({ theme }) => (theme.themeName === "themeLight" ? imageThemeLight : imageThemeDark)});
`;

export const ImageAbout = styled.div`
	${imageCommon}
	background-image: url(${({ theme }) => (theme.themeName === "themeLight" ? imageAboutLight : imageAboutDark)});
`;

export const ImageLogout = styled.div`
	${imageCommon}
	background-image: url(${({ theme }) => (theme.themeName === "themeLight" ? imageLogoutLight : imageLogoutDark)});
`;

export const Text = styled.div`
	margin-left: 1.8rem;
	white-space: nowrap;
`;
