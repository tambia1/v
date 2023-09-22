import styled from "styled-components";

export const Page = styled.div<{ index: number }>`
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	transition: transform 0.3s ease 0s;
	transform: translateX(${(props) => props.index * 100}%);
	background-color: #0000ff88;
`;
