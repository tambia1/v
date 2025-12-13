import styled from "@emotion/styled";

export const Compose = styled.div`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	overflow: hidden;
	background-color: ${(props) => props.theme.color.primary300};
	border-radius: 5rem;
`;
