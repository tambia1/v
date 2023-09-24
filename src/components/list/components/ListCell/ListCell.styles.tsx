import { ITheme } from "@src/themes/Theme.types";
import styled from "styled-components";

export const Text = styled.div`
	height: 100%;
	width: 100%;
`;

export const Line = styled.div`
	height: 0.5px;
	width: auto;
	margin-left: 1rem;
	margin-right: 1rem;
	background-color: #eeeeee;
`;

export const Container = styled.div`
	width: 100%;
	height: 4rem;

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

	& [isEnabled="true"] {
	}

	& [isEnabled="false"] {
		color: #999999;
		background-color: #777777;
	}

	&:hover {
		color: #000000;
		background-color: #dddddd;
	}

	&:active {
		color: #000000;
		background-color: #cccccc;
	}

	& [isSelected="true"] {
		color: #000000;
		background-color: #cccccc;
	}

	& [isSelected="false"] {
	}
`;
