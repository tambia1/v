import { Progress as ProgressComponent } from "@components/progress/Progress";
import { ProgressValue } from "@components/progress/Progress.styles";
import styled from "styled-components";
import logo from "./assets/logo.png";

export const Splash = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 1rem;
	box-sizing: border-box;

	color: #ffffff;
	background-color: #000000;

	z-index: 1;
`;

export const Logo = styled.div`
	background-image: url(${logo});
	background-size: contain;
	width: 8rem;
	height: 8rem;
`;

export const Text = styled.div`
	font-size: 200%;
`;

export const Version = styled.div`
	position: absolute;
	bottom: 2rem;
	right: 2rem;
`;

export const ProgressContainer = styled.div`
	margin-top: 1rem;
`;

export const Progress = styled(ProgressComponent)<{ percent: number }>`
	border: 1px solid #ffffff;

	& ${ProgressValue}{
		background-color: #ffffff;
	}
`;
