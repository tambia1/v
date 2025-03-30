import styled from "styled-components";

export const TestTable = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primary200};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const TableContainer = styled.div`
	margin-top: 1rem;
	width: 100%;
	max-height: 50rem;
	display: grid;
`;
