import styled from "@emotion/styled";

export const TestShared = styled.div`
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

export const Cell = styled.div`
	width: 15rem;
`;

export const Title = styled.div`
	margin-bottom: 1rem;
	font-weight: ${(props) => props.theme.font.font100.weight};
	font-size: ${(props) => props.theme.font.font100.size};
`;

