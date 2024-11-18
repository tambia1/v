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
	width: 25rem;
	height: 25rem;

	display: flex;
	flex-direction: column;

	background-image: url(${slotMachine});
	background-position: 50%;
	background-size: cover;

	position: relative;

	z-index: 1;
`;

export const Slot_1 = styled.div`
	width: 10.4rem;
    height: 3.6rem;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 10.7rem;
    left: 4.9rem;
    z-index: 0;
    border-radius: 0.3rem;
`;
