import { Container as Text } from "@src/components/text/Text.styles";
import styled, { css } from "styled-components";

export const Cell = styled.div`
	width: 100%;
	height: auto;
`;

export const Content = styled.div`
	height: auto;
	width: auto;
	padding: 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Line = styled.div`
	height: 0px;
	width: auto;
	margin-left: 1rem;
	margin-right: 1rem;
	border-top: solid ${(props) => props.theme.color.normalFgSelected} 1px;
`;

export const ListCell = styled.div<{ $isEnabled: boolean; $isSelected: boolean }>`
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

	&:hover ${Content} {
		color: ${(props) => props.theme.color.normalFgHover};
		background-color: ${(props) => props.theme.color.normalBgHover};
		cursor: pointer;
	}

	&:active ${Content} {
		color: ${(props) => props.theme.color.normalFgActive};
		background-color: ${(props) => props.theme.color.normalBgActive};
	}

	${(props) =>
		!props.$isEnabled &&
		css`
			& ${Content} {
				color: ${(props) => props.theme.color.normalFgDisabled};
				background-color: ${(props) => props.theme.color.normalBgDisabled};

				& ${Text} {
					color: ${(props) => props.theme.color.normalFgDisabled};
				}
			}
		`}

	${(props) =>
		props.$isSelected &&
		css`
			& ${Content} {
				color: ${(props) => props.theme.color.normalFgSelected};
				background-color: ${(props) => props.theme.color.normalBgSelected};
			}
		`}
`;
