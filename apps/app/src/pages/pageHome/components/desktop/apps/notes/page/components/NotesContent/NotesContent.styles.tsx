import styled from "styled-components";

export const NotesContent = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	padding: 1rem;
	box-sizing: border-box;
`;

export const Title = styled.textarea`
	width: auto;
	height: auto;
	max-width: 40rem;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	overflow: auto;
	box-shadow: 0 0 0.5rem 0 #00000066;
	border-radius: 1rem;
	padding: 1rem;
	outline: 0px solid transparent;
	background-color: ${(props) => props.theme.color.normalBg};
	resize: none;
	border: none;
`;

export const Content = styled.textarea`
	width: auto;
	height: auto;
	min-height: 5rem;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	flex-grow: 1;
	overflow: auto;
	box-shadow: 0 0 0.5rem 0 #00000066;
	border-radius: 1rem;
	padding: 1rem;
	outline: 0px solid transparent;
	background-color: ${(props) => props.theme.color.normalBg};
	resize: none;
	border: none;
`;

export const Buttons = styled.div<{ $isVisible: boolean }>`
	display: flex;
	flex-direction: row;
	height: auto;
	opacity: ${(props) => (props.$isVisible ? 1 : 0)};
	transition: all 0.3s ease;
`;
