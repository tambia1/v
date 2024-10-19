import styled from "styled-components";

export const About = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: ${(props) => props.theme.color.secondaryFg};
	background-color: ${(props) => props.theme.color.secondaryBg};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;
