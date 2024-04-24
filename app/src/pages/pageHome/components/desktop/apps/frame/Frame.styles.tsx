import styled from "styled-components";

export const Frame = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const IFrame = styled.iframe`
	width: 100%;
	height: 100%;
	border: none;
	padding: 0;
	margin: 0;
`;
