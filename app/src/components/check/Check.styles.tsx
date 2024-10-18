import styled from "styled-components";

export const Check = styled.div`
	display: flex;
`;

export const Dot = styled.div<{ $checkState: boolean }>`
	width: 50%;
	height: 100%;
	background-color: ${(props) => props.theme.color.primaryBg};
	border-radius: 100rem;
`;
