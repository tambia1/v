import styled, { css } from "styled-components";

export const Calendar = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};

	overflow: auto;
`;

export const Line = styled.div`
	background-color: #333333;
	height: 1px;
	margin: 10px;
`;

export const Year = styled.div``;

export const YearText = styled.div<{ $selected: boolean }>`
	font-size: 200%;
	font-weight: bold;
	margin: 10px;

	${(props) =>
		props.$selected &&
		css`
			color: #ff4500;
		`}
`;

export const Month = styled.div`
	display: inline-flex;
	flex-direction: column;
	margin: 10px;
`;

export const MonthText = styled.div<{ $selected: boolean }>`
	font-size: 120%;
	font-weight: bold;

	${(props) =>
		props.$selected &&
		css`
			color: #ff4500;
		`}
`;

export const MonthBox = styled.div`
	margin-top: 5px;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-gap: 2px;
`;

export const DayText = styled.div<{ $selected: boolean }>`
	font-size: 80%;
	padding: 1px;
	display: inline-flex;
	justify-content: center;
	align-items: center;

	${(props) =>
		props.$selected &&
		css`
			color: #ffffff;
			background-color: #ff4500;
			border-radius: 50px;
		`}
`;
