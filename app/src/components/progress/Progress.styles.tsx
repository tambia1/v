import styled from "styled-components";

export const Progress = styled.div`
	width: 15rem;
	height: 2rem;
	padding: 1px;
	box-sizing: border-box;
	border-radius: 100rem;
	background-color: transparent;
	border: 1px solid ${({ theme }) => theme.color.primaryFg};
	overflow: hidden;
	position: relative;
`;

export const ProgressContent = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 100rem;
	overflow: hidden;
`;

export const ProgressValue = styled.div.attrs<{ $width: number }>((props) => ({
	style: {
		width: `${props.$width}%`,
	},
}))`
	height: 100%;
	position: relative;
	border-radius: 0rem;
	background-color: ${({ theme }) => theme.color.primaryFg};
	transition: all 0.05s linear;
`;
