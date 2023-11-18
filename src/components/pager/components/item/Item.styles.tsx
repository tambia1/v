import styled, { css, keyframes } from "styled-components";

const goToCenter1 = keyframes`
	0% {transform: translateX(0%);}
	100% {transform: translateX(0%);}
`;

const moveFromCenterToLeft1 = keyframes`
	0% {transform: translateX(0%);}
	100% {transform: translateX(-100%);}
`;

const moveFromCenterToRight1 = keyframes`
	0% {transform: translateX(0%);}
	100% {transform: translateX(100%);}
`;

const moveFromLeftToCenter1 = keyframes`
	0% {transform: translateX(-100%);}
	100% {transform: translateX(0%);}
`;

const moveFromRightToCenter1 = keyframes`
	0% {transform: translateX(100%);}
	100% {transform: translateX(0%);}
`;

const hideFromCenter1 = keyframes`
	0% {opacity: 1;}
	100% {opacity: 0;}
`;

const showInCenter1 = keyframes`
	0% {opacity: 0;}
	100% {opacity: 1;}
`;

const goToCenter2 = keyframes`
	0% {opacity: 1; z-index: 0;}
	100% {opacity: 1; z-index: 0;}
`;

const moveFromCenterToLeft2 = keyframes`
	0% {opacity: 1; z-index: 1;}
	100% {opacity: 0; z-index: 0;}
`;

const moveFromCenterToRight2 = keyframes`
	0% {opacity: 1; z-index: 1;}
	100% {opacity: 0; z-index: 0;}
`;

const moveFromLeftToCenter2 = keyframes`
	0% {opacity: 0; z-index: 0;}
	100% {opacity: 1; z-index: 1;}
`;

const moveFromRightToCenter2 = keyframes`
	0% {opacity: 0; z-index: 0;}
	100% {opacity: 1; z-index: 1;}
`;

const hideFromCenter2 = keyframes`
	0% {opacity: 1; z-index: 1;}
	100% {opacity: 0; z-index: 0;}
`;

const showInCenter2 = keyframes`
	0% {opacity: 0; z-index: 0;}
	100% {opacity: 1; z-index: 1;}
`;

const Animations = {
	slide: {
		goToCenter: css`
			animation: ${goToCenter1} 0s both;
		`,
		goFromLeftToCenter: css`
			animation: ${moveFromLeftToCenter1} 0s both;
		`,
		moveFromLeftToCenter: css`
			animation: ${moveFromLeftToCenter1} 0.3s both;
		`,
		goFromCenterToLeft: css`
			animation: ${moveFromCenterToLeft1} 0s both;
		`,
		moveFromCenterToLeft: css`
			animation: ${moveFromCenterToLeft1} 0.3s both;
		`,
		goFromCenterToRight: css`
			animation: ${moveFromCenterToRight1} 0s both;
		`,
		moveFromCenterToRight: css`
			animation: ${moveFromCenterToRight1} 0.3s both;
		`,
		goFromRightToCenter: css`
			animation: ${moveFromRightToCenter1} 0s both;
		`,
		moveFromRightToCenter: css`
			animation: ${moveFromRightToCenter1} 0.3s both;
		`,
		hideFromCenter: css`
			animation: ${hideFromCenter1} 0.3s both;
		`,
		showInCenter: css`
			animation: ${showInCenter1} 0.3s both;
		`,
	},

	show: {
		goToCenter: css`
			animation: ${goToCenter2} 0s both;
		`,
		goFromLeftToCenter: css`
			animation: ${moveFromLeftToCenter2} 0s both;
		`,
		moveFromLeftToCenter: css`
			animation: ${moveFromLeftToCenter2} 0.3s both;
		`,
		goFromCenterToLeft: css`
			animation: ${moveFromCenterToLeft2} 0s both;
		`,
		moveFromCenterToLeft: css`
			animation: ${moveFromCenterToLeft2} 0.3s both;
		`,
		goFromCenterToRight: css`
			animation: ${moveFromCenterToRight2} 0s both;
		`,
		moveFromCenterToRight: css`
			animation: ${moveFromCenterToRight2} 0.3s both;
		`,
		goFromRightToCenter: css`
			animation: ${moveFromRightToCenter2} 0s both;
		`,
		moveFromRightToCenter: css`
			animation: ${moveFromRightToCenter2} 0.3s both;
		`,
		hideFromCenter: css`
			animation: ${hideFromCenter2} 0.3s both;
		`,
		showInCenter: css`
			animation: ${showInCenter2} 0.3s both;
		`,
	},
} as const;

export type IAnimationState = keyof typeof Animations.slide;
export type IAnimationType = keyof typeof Animations;

export const Item = styled.div<{ $animationType: IAnimationType; $animationState: IAnimationState }>`
	flex-shrink: 0;
	width: 100%;
	height: auto;
	position: absolute;

	${(props) => Animations[props.$animationType][props.$animationState]}
`;
