import { Button } from "@src/components/button/Button";
import { Icon } from "@src/icons/Icon";
import styled from "styled-components";

export const Login = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 1rem;
	box-sizing: border-box;

	background-color: #f5f5f588;
`;

export const Box = styled.div`
	position: relative;
	width: auto;
	height: auto;
	box-sizing: border-box;
	color: #fff;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	padding: 4rem;

	background-color: #0008;
	border-radius: 2rem;

	overflow: hidden;

	background-image: linear-gradient(135deg, #ffffff, #ced9e8);
	box-shadow: 5px 5px 10px 0px #3b5374;
`;

export const EmailBox = styled.div`
	display: flex;
	flex-direction: row;
	box-shadow: 0px 0px 5px 0px #08264e;
	border-radius: 5rem;
`;

export const EmailImage = styled(Icon)`
	width: 2rem;
	background-color: #08264e;
	padding: 0.5rem;
	border-radius: 5rem 0 0 5rem;
`;

export const EmailInput = styled.input`
	border: solid 1px #08264e;
	border-left: none;
	border-radius: 0 5rem 5rem 0;
	background-color: #3b5374;
	color: #ffffff;
	&::placeholder {
		color: #bbbbbb;
	}
`;

export const PasswordBox = styled.div`
	display: flex;
	flex-direction: row;
	box-shadow: 0px 0px 5px 0px #08264e;
	border-radius: 5rem;
`;

export const PasswordImage = styled(Icon)`
	width: 2rem;
	background-color: #08264e;
	padding: 0.5rem;
	border-radius: 5rem 0 0 5rem;
`;

export const PasswordInput = styled.input`
	border: solid 1px #08264e;
	border-left: none;
	border-radius: 0 5rem 5rem 0;
	background-color: #3b5374;
	color: #ffffff;
	&::placeholder {
		color: #bbbbbb;
	}
`;

export const ButtonBox = styled.div`
	height: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ButtonLogin = styled(Button)`
	background-image: none;
	background-color: #3b5374;
	color: #ffffff;
	text-shadow: none;
	border: solid 1px #08264e;
	box-shadow: 0px 0px 5px 0px #08264e;

	&:active {
		background-color: #08264e;
		background-image: none;
		box-shadow: none;
	}
`;

export const ButtonLogout = styled(Button)`
	background-image: none;
	background-color: #3b5374;
	color: #ffffff;
	text-shadow: none;
	border: solid 1px #08264e;
	box-shadow: 0px 0px 5px 0px #08264e;

	&:active {
		background-color: #08264e;
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

export const Loader = styled(Icon)`
	width: 2rem;
	height: 2rem;
	color: #08264e;
	animation: spin 3s linear infinite;

	@keyframes spin {
		0% {
			rotate: 0deg;
		}
		100% {
			rotate: 360deg;
		}
	}
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
