import styled, { keyframes } from "styled-components";

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

export const Chwazi = styled.div<{ $glow: boolean }>`
	position: relative;

	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: ${(props) => props.theme.color.primaryBg};
	background-color: ${(props) => (props.$glow ? props.theme.color.primaryBg : props.theme.color.primaryFg)};

	transition: all 0.3s ease;
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
