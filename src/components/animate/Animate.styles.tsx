import styled, { css, keyframes } from "styled-components";

const show = keyframes`
	0% { opacity: 1; display: flex;}
	100% { opacity: 1; display: flex;}
`;

const hide = keyframes`
	0% { opacity: 0; display: flex;}
	100% { opacity: 0; display: flex;}
`;

const hideAndRemove = keyframes`
	0% { opacity: 0; display: flex;}
	100% { opacity: 0; display: none;}
`;

const appear = keyframes`
	0% { opacity: 0; display: flex;}
	100% { opacity: 1; display: flex;}
`;

const disappear = keyframes`
	0% { opacity: 1; display: flex;}
	100% { opacity: 0; display: flex;}
`;

const disappearAndRemove = keyframes`
	0% { opacity: 1; display: flex;}
	100% { opacity: 0; display: none;}
`;

const Animations = {
	none: "",
	show: css`
		animation: ${show} ease 0s both;
		pointer-events: all;
	`,
	hide: css`
		animation: ${hide} ease 0s both;
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
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	opacity: 0;
	${({ $animation }) => Animations[$animation]};
`;
