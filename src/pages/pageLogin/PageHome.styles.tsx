import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${({ theme }) => theme.backgroundColors.primary};
`;
export const Title = styled.div`
	display: inline-flex;
	padding-bottom: 6px;
	color: ${({ theme }) => theme.colors.primary};
	font-size: ${({ theme }) => theme.fontSizes.large};
`;

export const Version = styled.div`
	margin: 1rem;
`;
