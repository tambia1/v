import styled, { css, keyframes } from "styled-components";
import { RuleSet } from "styled-components/dist/types";

export type State =
	| "goToCenter"
	| "goFromLeftToCenter"
	| "moveFromLeftToCenter"
	| "goFromCenterToLeft"
	| "moveFromCenterToLeft"
	| "goFromCenterToRight"
	| "moveFromCenterToRight"
	| "goFromRightRoCenter"
	| "moveFromRightToCenter"
	| "hideFromCenter"
	| "showInCenter";

const goToCenter = keyframes`
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(0%);
		}
	`;

const moveFromCenterToLeft = keyframes`
	0% {
		transform: translateX(0%);
	}
	100% {
		transform: translateX(-100%);
	}
`;

const moveFromCenterToRight = keyframes`
	0% {
		transform: translateX(0%);
	}
	100% {
		transform: translateX(100%);
	}
`;

const moveFromLeftToCenter = keyframes`
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(0%);
	}
`;

const moveFromRightToCenter = keyframes`
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(0%);
	}
`;

const hideFromCenter = keyframes`
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`;

const showInCenter = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

const animations: { [K in State]: RuleSet<object> } = {
	goToCenter: css`
		animation: ${goToCenter} 0s both;
	`,
	goFromLeftToCenter: css`
		animation: ${moveFromLeftToCenter} 0s both;
	`,
	moveFromLeftToCenter: css`
		animation: ${moveFromLeftToCenter} 0.3s both;
	`,
	goFromCenterToLeft: css`
		animation: ${moveFromCenterToLeft} 0s both;
	`,
	moveFromCenterToLeft: css`
		animation: ${moveFromCenterToLeft} 0.3s both;
	`,
	goFromCenterToRight: css`
		animation: ${moveFromCenterToRight} 0s both;
	`,
	moveFromCenterToRight: css`
		animation: ${moveFromCenterToRight} 0.3s both;
	`,
	goFromRightRoCenter: css`
		animation: ${moveFromRightToCenter} 0s both;
	`,
	moveFromRightToCenter: css`
		animation: ${moveFromRightToCenter} 0.3s both;
	`,
	hideFromCenter: css`
		animation: ${hideFromCenter} 0.3s both;
	`,
	showInCenter: css`
		animation: ${showInCenter} 0.3s both;
	`,
};

export const Item = styled.div<{ $state: State }>`
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	position: absolute;

	${(props) => animations[props.$state]}
`;