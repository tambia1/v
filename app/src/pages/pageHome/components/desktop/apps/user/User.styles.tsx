import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";
import imageUserLoggedIn from "./assets/userLoggedIn.png";
import imageUserLoggedOut from "./assets/userLoggedOut.png";

export const User = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 1rem;
	box-sizing: border-box;

	& * {
		transition: all 0.3s ease;
	}
`;

export const Box = styled.div`
	position: relative;
	width: 25rem;
	height: auto;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	padding: 2rem;
	overflow: hidden;
	border-radius: 16px;
	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.primaryBg};

`;

export const EmailBox = styled.div<{ disabled: boolean }>`
	width: 100%;
	height: 3rem;
	display: flex;
	flex-direction: row;
    align-items: center;
	border-radius: 5rem;
	border: 1px solid #8f9092;
    box-sizing: border-box;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const EmailImage = styled(Icon)`
	width: 2.5rem;
	border-radius: 5rem 0 0 5rem;
	flex-shrink: 0;
	box-sizing: border-box;
`;

export const EmailInput = styled.input`
	width: 100%;
	border: none;
	border-radius: 0 5rem 5rem 0;
	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.transparent};
	font-size: inherit;
	font-weight: inherit;
	padding-right: 0.5rem;
	
	&::placeholder {
		color: ${(props) => props.theme.color.quarteryFg};
	}

	&:disabled {
		color: ${(props) => props.theme.color.primaryFgDisabled};
	}
`;

export const PasswordBox = styled.div<{ disabled: boolean }>`
	width: 100%;
	height: 3rem;
	display: flex;
	flex-direction: row;
    align-items: center;
	border-radius: 5rem;
	border: 1px solid #8f9092;
    box-sizing: border-box;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const PasswordImage = styled(Icon)`
	width: 2.5rem;
	border-radius: 5rem 0 0 5rem;
	flex-shrink: 0;
	box-sizing: border-box;
`;

export const PasswordInput = styled.input`
	width: 100%;
	border: none;
	border-radius: 0 5rem 5rem 0;
	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.transparent};
	font-size: inherit;
	font-weight: inherit;
	padding-right: 0.5rem;
	
	&::placeholder {
		color: ${(props) => props.theme.color.quarteryFg};
	}

	&:disabled {
		color: ${(props) => props.theme.color.primaryFgDisabled};
	}
`;

export const ButtonBox = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: end;
`;

export const StateBox = styled.div`
	height: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Loader = styled.div`
	width: 2rem;
	height: 2rem;
`;

export const MessageIdle = styled.div`
	color: ${(props) => props.theme.color.primaryFg};
	white-space: nowrap;
`;

export const MessageSuccess = styled.div`
	color: ${(props) => props.theme.color.successFg};
	white-space: nowrap;
`;

export const MessageError = styled.div`
	color: ${(props) => props.theme.color.errorFg};
	white-space: nowrap;
`;

export const UserImage = styled.div<{ $logState: "loggedIn" | "loggedOut" }>`
	width: 7rem;
	height: 7rem;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
	background-image: url(${(props) => (props.$logState === "loggedIn" ? imageUserLoggedIn : imageUserLoggedOut)});
	background-position: 50%;
	background-size: 125%;
	border-radius: 50%;
	background-repeat: no-repeat;
`;

export const SocialLoginleBox = styled.div<{ disabled: boolean }>`
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	border-radius: 5rem;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const SocialLoginImage = styled(Icon)`
	width: 2rem;
	color: ${(props) => props.theme.color.primaryFg};
	flex-shrink: 0;
	cursor: pointer;
`;

export const MessagesBox = styled.div`
	width: 100%;
	height: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
