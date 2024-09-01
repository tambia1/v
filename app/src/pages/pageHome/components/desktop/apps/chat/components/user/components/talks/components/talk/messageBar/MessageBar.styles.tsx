import styled from "styled-components";

export const MessageBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: end;
	height: 12rem;
	padding: 1rem;
	box-sizing: border-box;
	gap: 1rem;
`;

export const Message = styled.textarea`
	display: flex;
	width: 100%;
	height: 100%;
	overflow: auto;
	box-shadow: 0 0 0.5rem 0 #00000066;
	outline: 0px solid transparent;
	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
	resize: none;
	border: none;
	box-sizing: border-box;

	border-width: 4px;
	border-style: solid;

	padding: 0 0.5rem;
	border-radius: 0.8rem;
	font-size: 18px;
`;
