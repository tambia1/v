import styled from "styled-components";

export const Snake = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: ${(props) => props.theme.color.secondary900};
	background-color: ${(props) => props.theme.color.secondary100};
`;

export const Container = styled.div`
	background-color: #000000;
	width: 100%;	
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Board = styled.div`
	background-color: #999999;
	width: 50rem;	
	height: 50rem;
`;
