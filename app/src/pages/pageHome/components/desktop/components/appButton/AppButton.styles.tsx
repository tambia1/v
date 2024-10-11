import styled, { css } from "styled-components";
import board from "./assets/board.png";
import calculator from "./assets/calculator.png";
import calendar from "./assets/calendar.png";
import camera from "./assets/camera.png";
import chat from "./assets/chat.png";
import chickenScream from "./assets/chickenScream.png";
import clashRoyale from "./assets/clashRoyale.webp";
import clock from "./assets/clock.png";
import ninja from "./assets/ninja.png";
import notes from "./assets/notes.png";
import photos from "./assets/photos.png";
import redis from "./assets/redis.png";
import settings from "./assets/settings.png";
import snake from "./assets/snake.png";
import speed from "./assets/speed.png";
import spin from "./assets/spin.png";
import stocks from "./assets/stocks.webp";
import store from "./assets/store.png";
import test from "./assets/test.png";
import tetris from "./assets/tetris.png";
import userLoggedIn from "./assets/userLoggedIn.png";
import userLoggedOut from "./assets/userLoggedOut.png";
import weather from "./assets/weather.png";

export const appIcons = {
	settings,
	calculator,
	calendar,
	camera,
	notes,
	photos,
	weather,
	tetris,
	ninja,
	clashRoyale,
	clock,
	store,
	userLoggedIn,
	userLoggedOut,
	snake,
	stocks,
	chat,
	spin,
	test,
	speed,
	board,
	redis,
	chickenScream,
} as const;

export type IAppIcon = keyof typeof appIcons;

export const Image = styled.div<{ $appIcon: IAppIcon | string }>`
	border-radius: 0.5rem;
	width: 5rem;
	height: 5rem;
	flex-shrink: 0;
	background-image: url(${({ $appIcon }) => appIcons[$appIcon as IAppIcon] || $appIcon});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50%;
	background-color: ${(props) => props.theme.color.normalBg};
	box-shadow: ${(props) => props.theme.color.shadow} ${(props) => props.theme.color.normalFg};
	border-radius: 15px;
`;

export const AppButton = styled.div<{ $isLoading: boolean; $isShakeMode: boolean }>`
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
	position: relative;

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

			animation: bounce 1.5s infinite;
		`}

	${(props) =>
		props.$isShakeMode &&
		css`
			@keyframes shake_1 {
				0% {
					transform: rotateZ(0deg);
				}
				33% {
					transform: rotateZ(-4deg);
				}
				66% {
					transform: rotateZ(4deg);
				}
				100% {
					transform: rotateZ(0deg);
				}
			}

			&:nth-child(4n + 1) {
				animation: shake_1 0.3s linear infinite normal forwards;
			}

			@keyframes shake_2 {
				0% {
					transform: rotateZ(0deg);
				}
				33% {
					transform: rotateZ(4deg);
				}
				66% {
					transform: rotateZ(-4deg);
				}
				100% {
					transform: rotateZ(0deg);
				}
			}

			&:nth-child(4n + 2) {
				animation: shake_2 0.3s linear infinite normal forwards;
			}

			@keyframes shake_3 {
				0% {
					transform: rotateZ(4deg);
				}
				33% {
					transform: rotateZ(0deg);
				}
				66% {
					transform: rotateZ(-4deg);
				}
				100% {
					transform: rotateZ(4deg);
				}
			}

			&:nth-child(4n + 3) {
				animation: shake_3 0.3s linear infinite normal forwards;
			}

			@keyframes shake_4 {
				0% {
					transform: rotateZ(-4deg);
				}
				33% {
					transform: rotateZ(0deg);
				}
				66% {
					transform: rotateZ(4deg);
				}
				100% {
					transform: rotateZ(-4deg);
				}
			}

			&:nth-child(4n + 4) {
				animation: shake_4 0.3s linear infinite normal forwards;
			}
		`}
`;

export const Title = styled.div`
	font-size: ${(props) => props.theme.size.s};
	text-align: center;
	word-break: normal;
	white-space: pre-wrap;
`;

export const ImageDeleteApp = styled.div<{ $isShakeMode: boolean }>`
	width: 3rem;
	height: 3rem;
	position: absolute;
	top: 0rem;
	left: 0rem;

	& svg {
		fill: ${(props) => props.theme.color.errorBg};
	}

	display: ${(props) => (props.$isShakeMode ? "flex" : "none")};
`;
