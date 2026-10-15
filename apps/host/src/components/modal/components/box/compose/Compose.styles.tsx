import styled from "@emotion/styled";

export const Compose = styled.div`
	position: relative;
	width: 25rem;
	min-height: 10rem;
	box-sizing: border-box;

	display: flex;
	flex-direction: column;
	justify-content: center;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};

	border-radius: 2rem;
	overflow: hidden;
`;
