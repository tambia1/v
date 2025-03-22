import styled from "styled-components";

export const Compose = styled.div`
	position: relative;
	width: 25rem;
	min-height: 10rem;
	box-sizing: border-box;

	display: flex;
	flex-direction: column;
	justify-content: center;

	color: ${(props) => props.theme.color.primaryFgEnabled};
	background-color: ${(props) => props.theme.color.primaryBgEnabled};

	border-radius: 0.5rem;
	overflow: hidden;
`;
