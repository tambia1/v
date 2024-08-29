import styled from "styled-components";

export const TestGraphQl = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};

	overflow: hidden;
	overflow-y: auto;
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const Container = styled.div`
	width: 100%;
	height: auto;

	display: flex;
	flex-direction: column;

	gap: 5rem;
`;
