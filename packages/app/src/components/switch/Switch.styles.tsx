import styled from "styled-components";
import { SwitchState } from "./Switch";

export const Container = styled.div`
	width: 2.1rem;
	height: 1.1rem;
	display: flex;
	background-color: ${(props) => props.theme.color.normalFg};
	border-radius: 10rem;
	overflow: hidden;
	padding: 0.1rem;
	box-sizing: border-box;
`;

export const Dot = styled.div<{ $switchState: SwitchState }>`
	width: 50%;
	height: 100%;
	transform: translateX(${({ $switchState }) => ($switchState === "left" ? "0%" : "100%")});
	transition: all 0.3s ease;
	background-color: ${(props) => props.theme.color.normalBg};
	border-radius: 10rem;
`;
