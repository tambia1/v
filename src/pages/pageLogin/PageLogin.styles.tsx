import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Box = styled.div`
	position: relative;
	width: 300px;
	height: 100px;
	box-sizing: border-box;
	color: ${({ theme }) => theme.colors.primary};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: #0008;
	border-radius: 5px;
`;

export const Text = styled.div`
	display: inline-flex;
	padding-bottom: 6px;
	align-self: flex-start;
	color: ${({ theme }) => theme.colors.primary};
	font-size: ${({ theme }) => theme.fontSizes.medium};
`;

export const Title = styled.div`
	display: inline-flex;
	padding-bottom: 6px;
	color: ${({ theme }) => theme.colors.primary};
	font-size: ${({ theme }) => theme.fontSizes.large};
`;

export const Spacer = styled.div`
	margin-top: 10px;
`;

export const Version = styled.div`
	margin: 1rem;
`;
