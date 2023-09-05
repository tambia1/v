import styled, { css, keyframes } from "styled-components";

const rotateAnimation = keyframes`
	0% {transform: rotate(0deg);}
	100% {transform: rotate(160deg);}
`;

const Rotate = css`
	animation-name: ${rotateAnimation};
	animation-duration: 1s;
	animation-timing-function: linear;
	animation-fill-mode: both;
`;

const moveAnimation = keyframes`
	0% {transform: translateX(0);}
	50% {transform: translateX(100px);}
	0% {transform: translateX(0);}
`;

const Move = css`
	animation-name: ${moveAnimation};
	animation-duration: 2s;
	animation-timing-function: ease;
	animation-fill-mode: both;
`;

const showAnimation = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`;

const Show = css`
	animation-name: ${showAnimation};
	animation-duration: 0.5s;
	animation-timing-function: ease;
	animation-fill-mode: both;
`;

const hideAnimation = keyframes`
	0% { opacity: 1; }
	100% { opacity: 0; }
`;

const Hide = css`
	animation-name: ${hideAnimation};
	animation-duration: 0.5s;
	animation-timing-function: ease;
	animation-fill-mode: both;
`;

export const AnimationTypes = {
	none: "",
	rotate: Rotate,
	move: Move,
	show: Show,
	hide: Hide,
} as const;

export type IAnimationType = keyof typeof AnimationTypes;

export const Container = styled.div<{ $animationType: IAnimationType }>`
	${({ $animationType }) => AnimationTypes[$animationType]};
`;
