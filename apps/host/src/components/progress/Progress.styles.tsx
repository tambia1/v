import styled from "@emotion/styled";

export const Progress = styled.div<{ $width: string }>`
	width: ${(props) => props.$width};
	height: 2rem;
	padding: 1px;
	box-sizing: border-box;
	border-radius: 100rem;
	background-color: transparent;
	border: 1px solid ${(props) => props.theme.color.primary800};
	overflow: hidden;
	position: relative;
`;

export const ProgressContent = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 100rem;
	overflow: hidden;
`;

export const ProgressValue = styled.div<{ $width: number }>`
	height: 100%;
	position: relative;
	border-radius: 100rem;
	background-color: ${(props) => props.theme.color.primary800};
	transition: all 0.05s linear;
	width: ${(props) => props.$width}%;
`;
