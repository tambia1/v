import styled from "styled-components";

export const Check = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	display: flex;
`;

export const Dot = styled.div<{ $checkState: boolean }>`
	width: 50%;
	height: 100%;
	background-color: ${(props) => props.theme.color.primaryBg};
	border-radius: 100rem;
`;
