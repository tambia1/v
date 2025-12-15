import styled from "@emotion/styled";
import { Icon } from "@src/components/icon/Icon.styles";

export const NightVision = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: #000;
`;

export const Canvas = styled.canvas`
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	background-color: #000;
	object-fit: cover;
`;

export const Video = styled.video`
	position: absolute;
	display: none;
	width: 100%;
	height: 100%;
	background-color: #000;
`;

export const Image = styled.div<{ $image: string }>`
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	background-image: url(${(props) => `"${props.$image}"`});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50%;
`;

export const Buttons = styled.div`
	position: absolute;
	inset: auto 0 0 0;
	display: flex;
	justify-content: center;
	gap: 4rem;
	margin-bottom: 3rem;

	& ${Icon}[data-name='iconSave'] svg {
		stroke: #0f0;
		fill: #030;
	}

	& ${Icon} svg {
		stroke: #0f0;
		fill: #020;
	}
`;

export const Loader = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	z-index: 1;
`;

