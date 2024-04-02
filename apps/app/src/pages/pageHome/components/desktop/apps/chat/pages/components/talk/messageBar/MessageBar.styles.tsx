import styled from "styled-components";

export const MessageBar = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: left;
	align-items: center;
	height: 7rem;
	padding: 1rem;
	box-sizing: border-box;
	gap: 1rem;
`;

export const Message = styled.textarea`
	display: flex;
	width: 100%;
	height: auto;
	overflow: auto;
	box-shadow: 0 0 0.5rem 0 #00000066;
	padding: 0.5rem;
	outline: 0px solid transparent;
	background-color: ${(props) => props.theme.color.normalBg};
	resize: none;
	border: none;
	box-sizing: border-box;

	border-width: 4px;
	border-style: solid;

	padding: 0;
	border-radius: 8px;
	font-size: 18px;
`;
