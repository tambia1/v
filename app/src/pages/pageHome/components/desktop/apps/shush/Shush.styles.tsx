import { Progress } from "@src/components/progress/Progress";
import { ProgressValue } from "@src/components/progress/Progress.styles";
import { Slider } from "@src/components/slider/Slider";
import styled from "styled-components";

export const Shush = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	color: #ffffff;
	background-color: #000000;
`;

export const ProgressStyled = styled(Progress)<{ percent: number }>`
	border-color: #ffffff;
	margin-top: ${(props) => props.theme.size.s};

	& ${ProgressValue}{
		background-color: #ffffff;
	}
`;

export const SliderStyled = styled(Slider)`
	margin-top: ${(props) => props.theme.size.s};
`;
