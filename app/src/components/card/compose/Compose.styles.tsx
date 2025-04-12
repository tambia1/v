import styled from "styled-components";

export const Compose = styled.div`
	width: 100%;
	max-width: 50rem;
	height: auto;
	inset: 0;

	display: flex;
	flex-direction: column;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};

	box-shadow: ${(props) => props.theme.shadow.box};

	border: solid 1px ${(props) => props.theme.color.primary700};
	border-radius: 1.5rem;
	overflow: hidden;
	box-sizing: border-box;
`;
