import styled from "styled-components";

export const Pager = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	position: relative;
	/* overflow: hidden; */
	background-color: #eeeeee;
`;

export const Page = styled.div<{ index: number }>`
	flex-shrink: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	transition: transform 0.3s ease 0s;
	transform: translateX(${(props) => props.index * 100}%);
	background-color: #0000ff88;
`;
