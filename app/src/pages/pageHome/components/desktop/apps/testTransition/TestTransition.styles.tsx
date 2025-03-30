import styled from "styled-components";

export const TestTransition = styled.div`
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

export const ElementContainer = styled.div`
	margin-top: 2rem;
`;

export const SwitchContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
`;
