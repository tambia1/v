import { Animate } from "@src/components/animate/Animate";
import styled from "styled-components";

export const Splash = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 1rem;
	box-sizing: border-box;

	color: #ffffff;
	background-color: #000000;

	z-index: 1;
`;

export const Title = styled(Animate)`
	position: relative;
`;

export const Version = styled.div`
	position: absolute;
	bottom: 1rem;
	right: 1rem;
`;

export const Progress = styled(Animate)`
	position: relative;

	& > div {
		width: 15rem;
		height: 1.5rem;
	}
`;
