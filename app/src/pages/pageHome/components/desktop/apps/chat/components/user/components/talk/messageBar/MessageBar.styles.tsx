import styled from "@emotion/styled";
import { Button } from "@src/components/button/Button";

export const MessageBar = styled.div<{ $numberOfLineBreaks: number }>`
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: end;
	height: calc(5rem + ${(props) => props.$numberOfLineBreaks * 3}rem);
	max-height: 12rem;
	box-sizing: border-box;
	gap: 1rem;
	padding: 1rem;
	background-color: ${(props) => props.theme.color.primary700};
	transition: all 0.3s ease-out;
`;

export const Message = styled.textarea`
	display: flex;
	width: 100%;
	height: 100%;
	overflow: auto;
	box-shadow: 0 0 0.5rem 0 #00000066;
	outline: 0px solid transparent;
	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};
	resize: none;
	border: none;
	box-sizing: border-box;

	border-width: 4px;
	border-style: solid;

	padding: 0.3rem 0.5rem;
	border-radius: 0.5rem;
	font-size: 150%;

	overflow: hidden;
`;

export const ButtonSend = styled(Button)`
	font-size: 150%;
`;
