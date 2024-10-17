import styled from "styled-components";

export const TestEdit = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primaryBgSelected};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
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
	border-top: solid ${(props) => props.theme.color.primaryFgSelected} 1px;
`;
