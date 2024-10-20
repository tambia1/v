import { Text } from "@src/components/text/Text.styles";
import styled, { css } from "styled-components";

export const Content = styled.div`
	height: 100%;
	width: auto;
	padding: 0.5rem 1.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	box-sizing: border-box;
`;

export const Line = styled.div`
	height: 0rem;
	width: auto;
	margin-left: 3rem;
	margin-right: 0rem;
	border-top: solid ${(props) => props.theme.color.quarteryFg} 1px;
`;

export const Cell = styled.div<{ $isEnabled: boolean; $isSelected: boolean }>`
	width: 100%;
	height: 3.5rem;

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
