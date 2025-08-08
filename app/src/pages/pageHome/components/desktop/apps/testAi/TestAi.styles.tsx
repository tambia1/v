import { Text } from "@src/components/text/Text";
import styled from "styled-components";

export const TestAi = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary300};

	overflow: auto;
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
	flex-shrink: 0;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	align-items: center;
`;

export const Col = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const Line = styled.div`
	height: 0rem;
	width: auto;
	margin-left: 0.5rem;
	margin-right: 0.5rem;
	margin-top: 1.0rem;
	margin-bottom: 1.0rem;
	border-top: solid ${(props) => props.theme.color.primary600} 1px;
`;

export const Cell = styled.div`
	width: 15rem;
`;

export const Title = styled(Text)`
	margin-bottom: 1rem;
	font-weight: ${(props) => props.theme.font.title.weight};
	font-size: ${(props) => props.theme.font.title.size};
`;

export const TextArea = styled.textarea`
	width: 100%;
	min-height: 6rem;
	padding: 1rem;
	box-sizing: border-box;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};
	border: 1px solid ${(props) => props.theme.color.primary400};
	border-radius: 0.5rem;

	font-family: inherit;
	font-size: inherit;
	resize: vertical;
	outline: none;

	&:focus {
		border-color: ${(props) => props.theme.color.primary600};
	}

	&:disabled {
		color: ${(props) => props.theme.color.primary500};
		background-color: ${(props) => props.theme.color.primary300};
		cursor: not-allowed;
		opacity: 0.6;
	}
`;

export const LoaderContainer = styled.div<{ $isVisible: boolean }>`
	display: flex;
	justify-content: left;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem;
	opacity: ${(props) => (props.$isVisible ? 1 : 0)};
	transition: opacity 0.3s ease;
`;

export const ConversationContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 1rem;
	background-color: ${(props) => props.theme.color.primary100};
	border: 1px solid ${(props) => props.theme.color.primary400};
	border-radius: 0.5rem;
	overflow-y: auto;
	max-height: 400px;
	min-height: 200px;
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
	max-width: 80%;
	padding: 0.75rem 1rem;
	border-radius: 1rem;
	margin-bottom: 0.5rem;
	word-wrap: break-word;
	white-space: pre-wrap;

	${(props) =>
		props.$isUser
			? `
		align-self: flex-end;
		background-color: ${props.theme.color.primary600};
		color: ${props.theme.color.primary100};
		border-bottom-right-radius: 0.25rem;
	`
			: `
		align-self: flex-start;
		background-color: ${props.theme.color.primary200};
		color: ${props.theme.color.primary800};
		border-bottom-left-radius: 0.25rem;
	`}
`;

export const MessageTime = styled.div`
	font-size: 0.75rem;
	color: ${(props) => props.theme.color.primary500};
	margin-top: 0.25rem;
	text-align: right;
`;

export const EmptyState = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	color: ${(props) => props.theme.color.primary500};
	text-align: center;
	gap: 0.5rem;
`;

export const ControlsRow = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	align-items: center;
	justify-content: space-between;
`;
