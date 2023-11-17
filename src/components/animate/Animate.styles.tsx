import styled, { css, keyframes } from "styled-components";

const show = keyframes`
	0% { opacity: 1; display: flex;}
	100% { opacity: 1; display: flex;}
`;

const hide = keyframes`
	0% { opacity: 0; display: none;}
	100% { opacity: 0; display: none;}
`;

const appear = keyframes`
	0% { opacity: 0; display: flex;}
	100% { opacity: 1; display: flex;}
`;

const disappear = keyframes`
	0% { opacity: 1; display: flex;}
	100% { opacity: 0; display: none;}
`;

const Animations = {
	none: "",
	show: css`
		animation: ${show} ease 0s both;
	`,
	hide: css`
		animation: ${hide} ease 0s both;
	`,
	appear: css`
		animation: ${appear} ease 3.3s both;
	`,
	disappear: css`
		animation: ${disappear} ease 3.3s both;
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
