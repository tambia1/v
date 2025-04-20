import styled from "styled-components";

export const Line = styled.div`
	width: 1px;
	height: 100%;
	background-color: ${(props) => props.theme.color.primary400};
	flex-shrink: 0;
`;
