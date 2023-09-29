import styled from "styled-components";

export const Settings = styled.div`
	width: auto;
	height: 100%;

	display: flex;
	flex-direction: column;

	background-color: ${(props) => props.theme.color.normalBgHover};

	padding: 1rem;
`;
