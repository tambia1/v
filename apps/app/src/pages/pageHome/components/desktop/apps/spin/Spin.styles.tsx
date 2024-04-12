import styled from "styled-components";
import bg from "./assets/bg.png";

export const Spin = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const SlotMachine = styled.div`
	width: 50rem;
	height: 50rem;

	display: flex;
	flex-direction: column;

	background-image: url(${bg});
	background-position: 50%;
	background-size: cover;

	position: relative;

	z-index: 1;
`;

export const Slot = styled.div`
	width: 21rem;
	height: 7.4rem;
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 21.2rem;
	left: 14.6rem;
	z-index: 0;
	border-radius: 0.3rem;
	overflow: hidden;
`;
