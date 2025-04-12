import styled from "styled-components";

export const Compose = styled.div`
	width: 100%;
	height: 3rem;
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary300};
	padding: 0.5rem;
	box-sizing: border-box;
	cursor: pointer;
`;
