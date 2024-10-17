import styled from "styled-components";

export const Clock = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primaryBgSelected};
`;

export const ClockCircle = styled.div`
	position: relative;
	width: 20rem;
	height: 20rem;
	border-radius: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-image: radial-gradient(circle, #eeeeee 0%, #ffffff 50%, #00000033 100%);
	box-shadow: 0px 0px 10px 0px #000000;
`;

export const Number = styled.div<{ $number: number }>`
	transform: rotate(${({ $number }) => 30 * $number}deg);
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: start;
	text-align: center;
	inset: 20px;
	color: #000000;
`;

export const NumberBox = styled.div<{ $number: number }>`
	position: relative;
	transform: rotate(${({ $number }) => -30 * $number}deg);
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

export const NumberMarker = styled.div<{ $number: number }>`
	background-color: #000000;
	width: 0.2rem;
	height: 0.5rem;
	position: absolute;
	transform: rotate(${({ $number }) => 30 * $number}deg) translateY(-1.5rem);
	box-shadow: 0px 0px 1px 0px #00000088;
`;

export const NumberText = styled.span`
	text-shadow: 0px 0px 1px #00000088;
`;

export const Hour = styled.div<{ $rotate: number }>`
	position: absolute;
	width: 0.8rem;
	height: 5rem;
	background-color: black;
	left: 50%;
	bottom: 50%;
	transform: translate(-50%) rotate(${({ $rotate }) => (360 / 12) * $rotate}deg);
	transform-origin: bottom;
	border-radius: 1rem 1rem;
	box-shadow: 0px 0px 5px 0px #00000088;
`;

export const Minute = styled.div<{ $rotate: number }>`
	position: absolute;
	width: 0.5rem;
	height: 7rem;
	background-color: blue;
	left: 50%;
	bottom: 50%;
	transform: translate(-50%) rotate(${({ $rotate }) => (360 / 60) * $rotate}deg);
	transform-origin: bottom;
	border-radius: 1rem 1rem;
	box-shadow: 0px 0px 5px 0px #00000088;
`;

export const Second = styled.div<{ $rotate: number }>`
	position: absolute;
	width: 0.1rem;
	height: 8rem;
	background-color: red;
	left: 50%;
	bottom: 50%;
	transform: translate(-50%) rotate(${({ $rotate }) => (360 / 60) * $rotate}deg);
	transform-origin: bottom;
	border-radius: 1rem 1rem;
	box-shadow: 0px 0px 5px 0px #00000088;
`;

export const Dot = styled.div`
	position: absolute;
	width: 1rem;
	height: 1rem;
	background-color: red;
	border-radius: 50%;
	box-shadow: 0px 0px 5px 0px #00000088;
`;
