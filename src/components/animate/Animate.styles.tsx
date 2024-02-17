import styled, { css, keyframes } from "styled-components";

const show = keyframes`
	0% { opacity: 1; display: flex; z-index: 0;}
	100% { opacity: 1; display: flex; z-index: 0;}
`;

const hide = keyframes`
	0% { opacity: 0; display: flex; z-index: -1;}
	100% { opacity: 0; display: flex; z-index: -1;}
`;

const hideAndRemove = keyframes`
	0% { opacity: 0; display: flex; z-index: -1;}
	100% { opacity: 0; display: none; z-index: -1;}
`;

const appear = keyframes`
	0% { opacity: 0; display: flex; z-index: 0;}
	100% { opacity: 1; display: flex; z-index: 0;}
`;

const disappear = keyframes`
	0% { opacity: 1; display: flex; z-index: 0;}
	99% { opacity: 0; display: flex; z-index: 0;}
	100% { opacity: 0; display: flex; z-index: -1;}
`;

const disappearAndRemove = keyframes`
	0% { opacity: 1; display: flex; z-index: 0;}
	99% { opacity: 0; display: flex; z-index: 0;}
	100% { opacity: 0; display: none; z-index: -1;}
`;

const Animations = {
	none: "",
	show: css`
		animation: ${show} linear 0s both;
		pointer-events: all;
	`,
	hide: css`
		animation: ${hide} linear 0s both;
		pointer-events: none;
	`,
	hideAndRemove: css`
		animation: ${hideAndRemove} ease 0s both;
		pointer-events: none;
	`,
	appear: css`
		animation: ${appear} ease 0.3s both;
		pointer-events: all;
	`,
	disappear: css`
		animation: ${disappear} ease 0.3s both;
		pointer-events: none;
	`,
	disappearAndRemove: css`
		animation: ${disappearAndRemove} ease 0.3s both;
		pointer-events: none;
	`,
} as const;

export type IAnimation = keyof typeof Animations;

export const Animate = styled.div<{ $animation: IAnimation }>`
	opacity: 0;
	${({ $animation }) => Animations[$animation]};
`;
