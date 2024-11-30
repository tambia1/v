import styled from "styled-components";
import slotMachine from "./assets/slotMachine.png";

export const Spin = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primaryBgSelected};
`;

export const SlotMachine = styled.div`
	width: 35rem;
	height: 35rem;

	display: flex;
	flex-direction: column;

	background-image: url(${slotMachine});
	background-position: 50%;
	background-size: cover;

	position: relative;

	z-index: 1;
`;

export const Slot_1 = styled.div`
	width: 14.5rem;
    height: 5.0rem;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 14.9rem;
    left: 10.3rem;
    z-index: 0;
    border-radius: 0.3rem;
`;
