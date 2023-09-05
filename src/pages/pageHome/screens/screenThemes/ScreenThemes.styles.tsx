import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;
`;

export const Title = styled.div`
	color: ${({ theme }) => theme.colors.primary};
	font-size: ${({ theme }) => theme.fontSizes.large};
`;
