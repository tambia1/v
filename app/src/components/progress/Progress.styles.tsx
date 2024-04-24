import styled from "styled-components";

export const Progress = styled.div`
	width: 15rem;
	height: 1.5rem;
	padding: 0.1rem;
	box-sizing: border-box;
	border-radius: 100rem;
	background-color: transparent;
	border: 1px solid ${({ theme }) => theme.color.normalBg};
`;
export const ProgressValue = styled.div.attrs<{ $width: number }>((props) => ({
	style: {
		width: `${props.$width}%`,
	},
}))`
	height: 100%;
	position: relative;
	border-radius: 100rem;
	background-color: ${({ theme }) => theme.color.normalBg};
	transition: all 0.3s ease;
`;
