import styled from "styled-components";

export const Box = styled.div`
	position: relative;
	width: 350px;
	height: 150px;
	box-sizing: border-box;

	display: flex;
	flex-direction: column;
	justify-content: center;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};

	border-radius: 5px;
	overflow: hidden;
`;
