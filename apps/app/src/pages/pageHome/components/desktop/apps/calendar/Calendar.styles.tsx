import { Button } from "@src/components/button/Button";
import styled, { css } from "styled-components";

export const Calendar = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const Line = styled.div`
	background-color: #999999;
	height: 1px;
	margin: 10px;
`;

export const Years = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
`;

export const Year = styled.div`
	display: flex;
	flex-direction: column;
`;

export const YearText = styled.div<{ $selected: boolean }>`
	font-size: 250%;
	font-weight: bold;
	margin: 10px;

	${(props) =>
		props.$selected &&
		css`
			color: #ff4500;
		`}
`;

export const Months = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
	gap: 1rem;
	padding: 1rem;
`;

export const Month = styled.div`
	display: inline-flex;
	flex-direction: column;
`;

export const MonthText = styled.div<{ $selected: boolean }>`
	font-size: 180%;
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
	grid-gap: 3px;
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

export const Buttons = styled.div`
	display: flex;
	justify-content: left;
	align-items: center;
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const ButtonToday = styled(Button)`
	&& {
		color: #ff4500;
	}
`;
