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

export const Chwazi = styled.div`
	position: relative;

	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: ${(props) => props.theme.color.primaryBg};
	background-color: ${(props) => props.theme.color.primaryFg};
`;

export const Circle = styled.div<{ color: string }>`
	position: absolute;
	width: 8rem;
	height: 8rem;
	background-color: ${(props) => props.color};
	border-radius: 50%;
	animation: ${grow} 1s forwards;
	pointer-events: none;
	margin-left: -4rem;
	margin-top: -4rem;
`;
