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

const progress = keyframes`
	0% {
		width: 0%;
	}
	100% {
		width: 100%;
	}
`;

export const Chwazi = styled.div<{ $isGlowing: boolean }>`
	position: relative;

	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: #000000;

	${(props) =>
		props.$isGlowing &&
		css`
			animation: ${glow} 0.3s forwards;
	`}
`;

export const Circle = styled.div<{ color: string; $isAnimate: boolean }>`
	position: absolute;
	width: 12rem;
	height: 12rem;
	background-color: ${(props) => props.color};
	border-radius: 50%;
	pointer-events: none;
	margin-left: -6rem;
	margin-top: -6rem;

	${(props) =>
		props.$isAnimate &&
		css`
			animation: ${grow} 1s ease-out forwards;
		`}
`;

export const ProgressBar = styled.div<{ $isProgressing: boolean }>`
	width: 0%;
	height: 1rem; 
	border-radius: 0.5rem;
	background-color: #ffffff;

	${(props) =>
		props.$isProgressing &&
		css`
			animation: ${progress} 1.8s linear forwards; 
		`}
`;
