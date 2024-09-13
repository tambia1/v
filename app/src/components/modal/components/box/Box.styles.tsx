import styled from "styled-components";

export const Box = styled.div`
	position: relative;
	width: 35rem;
	height: 15rem;
	box-sizing: border-box;

	display: flex;
	flex-direction: column;
	justify-content: center;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};

	border-radius: 0.5rem;
	overflow: hidden;
`;
