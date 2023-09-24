import { ITheme } from "@src/themes/Theme.types";
import styled, { css } from "styled-components";

export const Text = styled.div`
	height: auto;
	width: auto;
	padding: 1rem;
`;

export const Line = styled.div`
	height: 1px;
	width: auto;
	margin-left: 1rem;
	margin-right: 1rem;
	background-color: #eeeeee;
`;

export const Container = styled.div<{ isEnabled: boolean; isSelected: boolean }>`
	width: 100%;
	height: auto;

	color: ${({ theme }: { theme: ITheme }) => theme.color.onBackground};
	background-color: ${({ theme }: { theme: ITheme }) => theme.color.background};

	box-sizing: border-box;

	display: flex;
	flex-direction: column;

	border-radius: 0rem 0rem 0rem 0rem;

	&:first-child {
		border-radius: 1rem 1rem 0px 0px;
	}

	&:last-child {
		border-radius: 0px 0px 1rem 1rem;
	}

	&:last-child ${Line} {
		display: none;
	}

	&:only-child {
		border-radius: 1rem 1rem 1rem 1rem;
	}

	${(props) => {
		console.log("a", props.isSelected);

		return (
			props.isSelected &&
			css`
				color: #000000;
				background-color: red;
			`
		);
	}}

	&:hover {
		color: #000000;
		background-color: #dddddd;
		cursor: pointer;
	}

	&:active {
		color: #000000;
		background-color: #cccccc;
	}

	${(props) =>
		props.isSelected &&
		css`
			color: #000000;
			background-color: red;
		`}
`;
