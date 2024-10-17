import { Text } from "@src/components/text/Text.styles";
import styled, { css } from "styled-components";

export const Content = styled.div`
	height: auto;
	width: auto;
	padding: 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Line = styled.div`
	height: 0rem;
	width: auto;
	margin-left: 1rem;
	margin-right: 1rem;
	border-top: solid ${(props) => props.theme.color.primaryFgSelected} 1px;
`;

export const Cell = styled.div<{ $isEnabled: boolean; $isSelected: boolean }>`
	width: 100%;
	height: auto;

	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.primaryBg};

	box-sizing: border-box;

	display: flex;
	flex-direction: column;

	overflow: hidden;
	border-radius: 0rem 0rem 0rem 0rem;

	&:first-child {
		border-radius: 1rem 1rem 0rem 0rem;
	}

	&:last-child {
		border-radius: 0rem 0rem 1rem 1rem;
	}

	&:last-child ${Line} {
		display: none;
	}

	&:only-child {
		border-radius: 1rem 1rem 1rem 1rem;
	}

	&:hover ${Content} {
		color: ${(props) => props.theme.color.primaryFgHover};
		background-color: ${(props) => props.theme.color.primaryBgHover};
		cursor: pointer;
	}

	&:active ${Content} {
		color: ${(props) => props.theme.color.primaryFgActive};
		background-color: ${(props) => props.theme.color.primaryBgActive};
	}

	${(props) =>
		!props.$isEnabled &&
		css`
			& ${Content} {
				color: ${(props) => props.theme.color.primaryFgDisabled};
				background-color: ${(props) => props.theme.color.primaryBgDisabled};

				& ${Text} {
					color: ${(props) => props.theme.color.primaryFgDisabled};
				}
			}
		`}

	${(props) =>
		props.$isSelected &&
		css`
			& ${Content} {
				color: ${(props) => props.theme.color.primaryFgSelected};
				background-color: ${(props) => props.theme.color.primaryBgSelected};
			}
		`}
`;
