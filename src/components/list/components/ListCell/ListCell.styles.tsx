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
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const Container = styled.div<{ $isEnabled: boolean; $isSelected: boolean }>`
	width: 100%;
	height: auto;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};

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

	&:hover {
		color: ${(props) => props.theme.color.normalFgHover};
		background-color: ${(props) => props.theme.color.normalBgHover};
		cursor: pointer;
	}

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
		background-color: ${(props) => props.theme.color.normalBgActive};
	}

	${(props) =>
		!props.$isEnabled &&
		css`
			color: ${(props) => props.theme.color.normalFgDisabled};
			background-color: ${(props) => props.theme.color.normalBgDisabled};
		`}

	${(props) =>
		props.$isSelected &&
		css`
			color: ${(props) => props.theme.color.normalFgSelected};
			background-color: ${(props) => props.theme.color.normalBgSelected};
		`}
`;
