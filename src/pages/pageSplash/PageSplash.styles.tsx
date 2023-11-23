import styled from "styled-components";

export const PageSplash = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	color: #ffffff;
	background-color: #000000;
`;

export const Title = styled.div``;

export const Version = styled.div`
	position: absolute;
	bottom: 1rem;
	right: 1rem;
`;

export const Progress = styled.div`
	& > div {
		width: 15rem;
		height: 1.5rem;
	}
`;
