import styled from "@emotion/styled";

export const About = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: ${(props) => props.theme.color.secondary900};
	background-color: ${(props) => props.theme.color.secondary100};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;
