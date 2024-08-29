import { Slider } from "@src/components/slider/Slider";
import styled from "styled-components";

export const TestCube = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const SliderComponent = styled(Slider)`
	background-color: red;
`;
