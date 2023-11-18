import styled, { css } from "styled-components";
import background1 from "./background/imagesTheme1/bg_0.png";
import background2 from "./background/imagesTheme2/bg_0.jpg";
import background3 from "./background/imagesTheme3/bg_0.jpg";
import background4 from "./background/imagesTheme4/bg_0.jpg";
import background5 from "./background/imagesTheme5/bg_0.jpg";
import background6 from "./background/imagesTheme6/bg_0.jpg";
import background7 from "./background/imagesTheme7/bg_0.jpg";
import background8 from "./background/imagesTheme8/bg_0.jpg";

export const backgroundImages = ["", background1, background2, background3, background4, background5, background6, background7, background8];

export const Theme = styled.div`
	width: auto;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
`;

export const Background = css`
	width: 5rem;
	height: 5rem;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: 50%;
`;

export const BackgroundImage = styled.div<{ $backgroundImage: string }>`
	${Background}
	background-image: url(${({ $backgroundImage }) => $backgroundImage});
`;
