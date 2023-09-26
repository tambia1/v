import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	align-items: center;
	background-color: ${(props) => props.theme.color.normalBgDisabled};
`;
