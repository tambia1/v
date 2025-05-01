import { Text } from "@src/components/text/Text";
import styled from "styled-components";

export const TestEdit = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};

	overflow: auto;
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
	flex-shrink: 0;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: center;
`;

export const Col = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const Line = styled.div`
	height: 0rem;
	width: auto;
	margin-left: 0.5rem;
	margin-right: 0.5rem;
	margin-top: 1.0rem;
	margin-bottom: 1.0rem;
	border-top: solid ${(props) => props.theme.color.primary600} 1px;
`;

export const Cell = styled.div`
	width: 15rem;
`;

export const Title = styled(Text)`
	margin-bottom: 1rem;
	font-weight: ${(props) => props.theme.font.title.weight};
	font-size: ${(props) => props.theme.font.title.size};
`;
