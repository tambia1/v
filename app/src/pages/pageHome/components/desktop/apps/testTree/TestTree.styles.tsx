import styled from "styled-components";

export const TestTree = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};

	overflow-y: auto;
`;

export const InputContainer = styled.div`
	margin-top: 1rem;
`;

export const TreeContainer = styled.div`
	margin-top: 1rem;
`;
