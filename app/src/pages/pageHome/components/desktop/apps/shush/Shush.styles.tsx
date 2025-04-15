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
	width: 100%;
	border-color: #ffffff;
	margin-top: ${(props) => props.theme.size.size200};

	& ${ProgressValue}{
		background-color: #ffffff;
	}
`;

export const SliderStyled = styled(Slider)`
	width: 100%;
	margin-top: ${(props) => props.theme.size.size200};
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
`;
