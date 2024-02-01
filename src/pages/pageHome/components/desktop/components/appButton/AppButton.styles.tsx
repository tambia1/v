import styled, { css } from "styled-components";
import calculator from "./assets/calculator.png";
import settings from "./assets/settings.png";
import camera from "./assets/camera.png";
import notes from "./assets/notes.png";
import photos from "./assets/photos.png";
import weather from "./assets/weather.png";
import tetris from "./assets/tetris.png";
import clashRoyale from "./assets/clashRoyale.webp";
import clock from "./assets/clock.png";
import userLoggedIn from "./assets/userLoggedIn.png";
import userLoggedOut from "./assets/userLoggedOut.png";
import snake from "./assets/snake.png";

const appIcons = {
	settings,
	calculator,
	camera,
	notes,
	photos,
	weather,
	tetris,
	clashRoyale,
	clock,
	userLoggedIn,
	userLoggedOut,
	snake,
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
	box-shadow: 0px 0px 5px ${(props) => props.theme.color.shadow};
	border-radius: 15px;
`;

export const AppButton = styled.div<{ $isLoading: boolean }>`
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

	${(props) =>
		props.$isLoading &&
		css`
			animation: bounce 1.5s infinite;

			@keyframes bounce {
				0%,
				20%,
				50%,
				80%,
				100% {
					transform: translate3d(0, 0, 0);
				}
				40% {
					transform: translate3d(0, -20px, 0);
				}
				60% {
					transform: translate3d(0, -10px, 0);
				}
			}
		`}
`;

export const Title = styled.div`
	font-size: ${(props) => props.theme.size.s};
	text-align: center;
	word-break: normal;
`;
