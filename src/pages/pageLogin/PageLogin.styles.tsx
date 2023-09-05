import styled from "styled-components";
import imageBoxLeftBg from "./assets/login_bg.svg";
import imageRedis from "./assets/redis_icon.png";

export const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Box = styled.div`
	position: relative;
	width: 600px;
	height: 400px;
	box-sizing: border-box;
	color: ${({ theme }) => theme.colors.primary};

	display: flex;
	flex-direction: row;

	background-color: #0008;
	border-radius: 5px;
`;

export const BoxLeft = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	background-color: #06145733;
	background-image: url(${imageBoxLeftBg});
	background-size: contain;
	background-repeat: no-repeat;
`;

export const BoxRight = styled.div`
	width: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 70px;
	margin-right: 70px;
`;

export const Text = styled.div`
	display: inline-flex;
	padding-bottom: 6px;
	align-self: flex-start;
	color: ${({ theme }) => theme.colors.primary};
	font-size: ${({ theme }) => theme.fontSizes.medium};
`;

export const Title = styled.div`
	display: inline-flex;
	padding-bottom: 6px;
	color: ${({ theme }) => theme.colors.primary};
	font-size: ${({ theme }) => theme.fontSizes.large};
`;

export const Icon = styled.div`
	display: inline-flex;
	width: 50px;
	height: 50px;
	background-image: url(${imageRedis});
	background-size: contain;
	background-repeat: no-repeat;
	margin-right: 30px;
`;

export const Spacer = styled.div`
	margin-top: 10px;
`;

export const Version = styled.div`
	margin: 1rem;
`;
