import styled from "@emotion/styled";

export const Frame = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primary200};
`;

export const IFrame = styled.iframe`
	width: 100%;
	height: 100%;
	border: none;
	padding: 0;
	margin: 0;
`;
