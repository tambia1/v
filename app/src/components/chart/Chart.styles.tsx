import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	background-color: ${(props) => props.theme.color.primaryBg};
	transform: translate3d(0px, 0px, 0px);
`;
