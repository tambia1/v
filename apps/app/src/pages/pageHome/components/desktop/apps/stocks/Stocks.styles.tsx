import styled from "styled-components";

export const Stocks = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const CompanyName = styled.div`
	color: ${(props) => props.theme.color.normalFg};
	margin: 1rem;
`;
