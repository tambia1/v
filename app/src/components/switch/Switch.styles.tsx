import styled from "styled-components";
import type { SwitchState } from "./Switch";

export const Switch = styled.div`
	width: 5rem;
	height: 2.5rem;
	display: flex;
	background-color: ${(props) => props.theme.color.primaryFg};
	border-radius: 100rem;
	overflow: hidden;
	padding: 0.2rem;
	box-sizing: border-box;
`;

export const Dot = styled.div<{ $switchState: SwitchState }>`
	width: 50%;
	height: 100%;
	transform: translateX(${({ $switchState }) => ($switchState === "left" ? "0%" : "100%")});
	transition: all 0.3s ease;
	background-color: ${(props) => props.theme.color.primaryBg};
	border-radius: 100rem;
`;
