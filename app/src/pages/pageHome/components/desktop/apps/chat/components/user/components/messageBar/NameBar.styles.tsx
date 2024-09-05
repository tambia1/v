import { Button } from "@src/components/button/Button";
import styled from "styled-components";

export const NameBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: center;
	height: 7rem;
	padding: 1rem;
	box-sizing: border-box;
	gap: 1rem;
`;

export const Name = styled.input`
	display: flex;
	width: 100%;
	height: auto;
	overflow: auto;
	box-shadow: 0 0 0.5rem 0 #00000066;
	outline: 0px solid transparent;
	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
	resize: none;
	border: none;
	box-sizing: border-box;

	border-width: 0.2rem;
	border-style: solid;

	padding: 0.5rem;
	border-radius: 0.5rem;
	font-size: 150%;
`;

export const ButtonSet = styled(Button)`
	font-size: 150%;
`;
