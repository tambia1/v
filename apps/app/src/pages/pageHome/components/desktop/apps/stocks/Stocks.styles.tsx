import styled from "styled-components";

export const Stocks = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};

	overflow: auto;
`;

export const LoaderContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Refresh = styled.div`
	cursor: pointer;
`;

export const TablesContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const Table = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	margin-top: 2rem;
`;

export const Symbol = styled.div``;
