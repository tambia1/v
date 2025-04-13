import styled from "styled-components";

export const Content = styled.div`
	flex: 1;
	display: flex;
	justify-content: left;
	font-size: ${(props) => props.theme.font.body.size};
	font-weight: ${(props) => props.theme.font.body.weight};
	color: ${(props) => props.theme.color.primary800};
`;
