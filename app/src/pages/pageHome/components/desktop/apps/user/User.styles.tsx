import { Button } from "@src/components/button/Button";
import { Icon } from "@src/icons/Icon";
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

	background-color: #f5f5f588;

	& * {
		transition: all 0.3s ease;
	}
`;

export const Box = styled.div`
	position: relative;
	width: 25rem;
	height: auto;
	box-sizing: border-box;
	color: ${(props) => props.theme.color.boxColor1};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	padding: 2rem;

	border-radius: 2rem;

	overflow: hidden;

	background-image: linear-gradient(135deg, ${(props) => props.theme.color.boxColor1}, ${(props) => props.theme.color.boxColor2});
	box-shadow: ${(props) => props.theme.color.shadow} ${(props) => props.theme.color.normalFg};
`;

export const EmailBox = styled.div<{ disabled: boolean }>`
	width: 100%;
	display: flex;
	flex-direction: row;
	box-shadow: ${(props) => props.theme.color.shadow} ${(props) => props.theme.color.boxColor4};
	border-radius: 5rem;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const EmailImage = styled(Icon)`
	width: 2rem;
	background-color: ${(props) => props.theme.color.boxColor4};
	padding: 0.5rem;
	border-radius: 5rem 0 0 5rem;
	flex-shrink: 0;
`;

export const EmailInput = styled.input`
	width: 100%;
	border: solid 1px ${(props) => props.theme.color.boxColor4};
	border-left: none;
	border-radius: 0 5rem 5rem 0;
	background-color: ${(props) => props.theme.color.boxColor3};
	color: ${(props) => props.theme.color.boxColor1};

	&::placeholder {
		color: ${(props) => props.theme.color.boxColor5};
	}

	&:disabled {
		color: ${(props) => props.theme.color.boxColor5};
	}
`;

export const PasswordBox = styled.div<{ disabled: boolean }>`
	width: 100%;
	display: flex;
	flex-direction: row;
	box-shadow: ${(props) => props.theme.color.shadow} ${(props) => props.theme.color.boxColor4};
	border-radius: 5rem;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const PasswordImage = styled(Icon)`
	width: 100%;
	width: 2rem;
	background-color: ${(props) => props.theme.color.boxColor4};
	padding: 0.5rem;
	border-radius: 5rem 0 0 5rem;
	flex-shrink: 0;
`;

export const PasswordInput = styled.input`
	width: 100%;
	border: solid 1px ${(props) => props.theme.color.boxColor4};
	border-left: none;
	border-radius: 0 5rem 5rem 0;
	background-color: ${(props) => props.theme.color.boxColor3};
	color: ${(props) => props.theme.color.boxColor1};

	&::placeholder {
		color: ${(props) => props.theme.color.boxColor5};
	}

	&:disabled {
		color: ${(props) => props.theme.color.boxColor5};
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

export const ButtonLogin = styled(Button)`
	background-image: none;
	background-color: ${(props) => props.theme.color.boxColor4};
	color: ${(props) => props.theme.color.boxColor1};
	text-shadow: none;
	border: solid 1px ${(props) => props.theme.color.boxColor4};
	box-shadow: ${(props) => props.theme.color.shadow} ${(props) => props.theme.color.boxColor4};

	&:active {
		background-color: ${(props) => props.theme.color.boxColor4};
		background-image: none;
		box-shadow: none;
	}
`;

export const ButtonLogout = styled(Button)`
	background-image: none;
	background-color: ${(props) => props.theme.color.boxColor7};
	color: ${(props) => props.theme.color.boxColor1};
	text-shadow: none;
	border: solid 1px ${(props) => props.theme.color.boxColor8};
	box-shadow: ${(props) => props.theme.color.shadow} ${(props) => props.theme.color.boxColor8};

	&:active {
		background-color: ${(props) => props.theme.color.boxColor8};
		background-image: none;
		box-shadow: none;
	}
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

export const Idle = styled.div`
	height: 2rem;
	color: ${(props) => props.theme.color.boxColor4};
	white-space: nowrap;
`;

export const Success = styled.div`
	height: 2rem;
	color: ${(props) => props.theme.color.successBg};
	white-space: nowrap;
`;

export const Error = styled.div`
	height: 2rem;
	color: ${(props) => props.theme.color.errorBg};
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
	box-shadow: ${(props) => props.theme.color.shadow} ${(props) => props.theme.color.boxColor4};
`;

export const GoogleBox = styled.div<{ disabled: boolean }>`
	width: 100%;
	display: flex;
	flex-direction: row;
	border-radius: 5rem;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const GoogleImage = styled(Icon)`
	width: 2rem;
	color: ${(props) => props.theme.color.boxColor4};
	padding: 0.5rem;
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
