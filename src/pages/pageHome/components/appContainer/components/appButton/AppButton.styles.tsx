import styled from "styled-components";

import calculator from "./assets/calculator.png";
import settings from "./assets/settings.png";
import camera from "./assets/camera.png";
import notes from "./assets/notes.png";
import photos from "./assets/photos.png";
import weather from "./assets/weather.png";
import tetris from "./assets/tetris.png";
import clashRoyale from "./assets/clashRoyale.webp";

const appIcons = {
	settings,
	calculator,
	camera,
	notes,
	photos,
	weather,
	tetris,
	clashRoyale,
} as const;

export type IAppIcon = keyof typeof appIcons;

export const Image = styled.div<{ $appIcon: IAppIcon }>`
	border-radius: 0.5rem;
	width: 5rem;
	height: 5rem;
	flex-shrink: 0;
	background-image: url(${({ $appIcon }) => appIcons[$appIcon]});
	background-size: contain;
	background-repeat: no-repeat;
	box-shadow: 0px 0px 5px #00000066;
	border-radius: 15px;
`;

export const AppButton = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	gap: ${(props) => props.theme.size.xs};
	padding: ${(props) => props.theme.size.xs};
	width: 5rem;
	height: 8rem;
	overflow: hidden;
	border-radius: 0.5rem;

	transition: all 0.3s ease;

	&:hover {
		background-color: ${(props) => props.theme.color.normalBgHover};
	}

	&:active {
		background-color: ${(props) => props.theme.color.normalBgActive};
	}
`;

export const Title = styled.div`
	font-size: ${(props) => props.theme.size.s};
	text-align: center;
`;
