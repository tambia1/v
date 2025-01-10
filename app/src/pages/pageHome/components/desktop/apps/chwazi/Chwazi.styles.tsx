import styled, { css, keyframes } from "styled-components";

const grow = keyframes`
	0% {
		transform: scale(0);
		opacity: 0.5;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
`;

const glow = keyframes`
	0% {
		background-color: #000000;
	}

	50% {
		background-color: #ffffff;
	}

	100% {
		background-color: #000000;
	}
`;

export const Chwazi = styled.div<{ $isGlow: boolean }>`
	position: relative;

	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: #000000;

	${(props) =>
		props.$isGlow &&
		css`
			animation: ${glow} 0.3s forwards;
	`}
`;

export const Circle = styled.div<{ color: string }>`
	position: absolute;
	width: 12rem;
	height: 12rem;
	background-color: ${(props) => props.color};
	border-radius: 50%;
	animation: ${grow} 1s forwards;
	pointer-events: none;
	margin-left: -6rem;
	margin-top: -6rem;
`;
