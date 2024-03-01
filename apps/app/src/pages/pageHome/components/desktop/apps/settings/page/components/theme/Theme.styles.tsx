import styled, { css } from "styled-components";
import lightBackground1 from "./background/theme1/bg_0.jpg";
import lightBackground2 from "./background/theme2/bg_0.jpg";
import lightBackground3 from "./background/theme3/bg_0.jpg";
import lightBackground4 from "./background/theme4/bg_0.jpg";
import lightBackground5 from "./background/theme5/bg_0.jpg";
import lightBackground6 from "./background/theme6/bg_0.jpg";
import lightBackground7 from "./background/theme7/bg_0.jpg";
import lightBackground8 from "./background/theme8/bg_0.jpg";
import darkBackground1 from "./background/theme1/bg_0_dark.jpg";
import darkBackground2 from "./background/theme2/bg_0_dark.jpg";
import darkBackground3 from "./background/theme3/bg_0_dark.jpg";
import darkBackground4 from "./background/theme4/bg_0_dark.jpg";
import darkBackground5 from "./background/theme5/bg_0_dark.jpg";
import darkBackground6 from "./background/theme6/bg_0_dark.jpg";
import darkBackground7 from "./background/theme7/bg_0_dark.jpg";
import darkBackground8 from "./background/theme8/bg_0_dark.jpg";

export const backgroundImages = [
	{ light: "", dark: "" },
	{ light: lightBackground1, dark: darkBackground1 },
	{ light: lightBackground2, dark: darkBackground2 },
	{ light: lightBackground3, dark: darkBackground3 },
	{ light: lightBackground4, dark: darkBackground4 },
	{ light: lightBackground5, dark: darkBackground5 },
	{ light: lightBackground6, dark: darkBackground6 },
	{ light: lightBackground7, dark: darkBackground7 },
	{ light: lightBackground8, dark: darkBackground8 },
];

export const Theme = styled.div`
	width: auto;
	height: auto;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;
`;

export const Background = css`
	width: 5rem;
	height: 5rem;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: 50%;
`;

export const BackgroundImage = styled.div<{ $backgroundImageIndex: number }>`
	${Background}
	background-image: url(${(props) => backgroundImages[props.$backgroundImageIndex][props.theme.themeName]});
`;
