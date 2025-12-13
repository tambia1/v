import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Calculator = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: #000000;
`;

export const ButtonsContainer = styled.div`
	position: absolute;
	bottom: 0px;
	right: 0px;
	left: 0px;

	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-gap: 10px;

	font-size: 250%;

	margin: 10px;
`;

export const Result = styled.div`
	color: #ffffff;
	font-size: 200%;
	font-weight: normal;
	height: auto;
	grid-column: 1 / span 4;
	grid-row: 1;
	justify-self: end;
	margin: 5px;
`;

export const button = css`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	border-radius: 50px;

	&:hover {
		opacity: 0.8;
	}

	&:active {
		opacity: 0.5;
	}
`;

export const ButtonYellow = styled.div`
	${button}
	background-color: #ff9501;
	color: #ffffff;
`;

export const ButtonBrown = styled.div`
	${button}
	background-color: #323232;
	color: #ffffff;
`;

export const ButtonGrey = styled.div`
	${button}
	background-color: #a7a7a7;
	color: #000000;
`;

export const ButtonZero = styled.div`
	${button}
	background-color: #323232;
	color: #ffffff;
	grid-column: 1 / span 2;
	grid-row: 6;
`;
