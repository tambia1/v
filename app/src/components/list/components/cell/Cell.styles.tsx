import { Text } from "@src/components/text/Text.styles";
import styled, { css } from "styled-components";
import type { LineState } from "./Cell";

export const Content = styled.div`
	height: 100%;
	width: auto;
	padding: 0rem 1.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	box-sizing: border-box;
`;

export const Line = styled.div<{ $lineState: LineState }>`
	height: 0rem;
	width: auto;
	margin-left: ${(props) => (props.$lineState === "long" ? "0rem" : "4rem")};
	margin-right: 0rem;
	border-top: solid ${(props) => props.theme.color.primary700} 1px;
`;

export const Cell = styled.div<{ $isEnabled: boolean; $isSelected: boolean }>`
	width: 100%;
	height: 4rem;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};

	box-sizing: border-box;

	display: flex;
	flex-direction: column;
	flex-shrink: 0;

	overflow: hidden;
	border-radius: 0rem 0rem 0rem 0rem;

	&:last-child ${Line} {
		display: none;
	}

	&:hover ${Content} {
		color: ${(props) => props.theme.color.primary700};
		background-color: ${(props) => props.theme.color.primary300};
		cursor: pointer;
	}

	&:active ${Content} {
		color: ${(props) => props.theme.color.primary700};
		background-color: ${(props) => props.theme.color.primary400};
	}

	${(props) =>
		!props.$isEnabled &&
		css`
			& ${Content} {
				cursor: not-allowed;
				color: ${(props) => props.theme.color.primary400};
				background-color: ${(props) => props.theme.color.primary200};

				& ${Text} {
					color: ${(props) => props.theme.color.primary400};
				}
			}
		`}

	${(props) =>
		props.$isSelected &&
		css`
			& ${Content} {
				color: ${(props) => props.theme.color.primary600};
				background-color: ${(props) => props.theme.color.primary200};
			}
		`}
`;
