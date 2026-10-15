import styled from "@emotion/styled";

export const Content = styled.div`
	flex: 1;
	display: flex;
	justify-content: left;
	font-size: ${(props) => props.theme.font.font300.size};
	font-weight: ${(props) => props.theme.font.font300.weight};
	color: ${(props) => props.theme.color.primary800};
`;
