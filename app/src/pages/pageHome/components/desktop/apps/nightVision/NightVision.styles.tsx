import styled from "@emotion/styled";
import { Icon } from "@src/components/icon/Icon.styles";
import { Slider } from "@src/components/slider/Slider";
import { Text } from "@src/components/text/Text";

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

export const Sliders = styled.div<{ $visible: boolean }>`
	position: absolute;
	top: 1rem;
	right: 1rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 1.5rem;
	background-color: #000000;
	border-radius: 1rem;
	border: 1px solid #00ff00;
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	transition: opacity 0.3s ease;
`;

export const SliderRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

export const SliderLabel = styled(Text)`
	color: #00ff00;
`;

export const SliderStyled = styled(Slider)`
	width: 10rem;
	margin: 0;
`;

export const ZoomContainer = styled.div<{ $visible: boolean }>`
	position: absolute;
	left: 1rem;
	right: 1rem;
	bottom: 11rem; 
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	justify-content: center;
	padding: 0 1rem;
	opacity: ${(props) => (props.$visible ? 1 : 0)};
	transition: opacity 0.3s ease;
	z-index: 1;
`;

export const ZoomSlider = styled(Slider)`
	width: 100%;
	margin: 0;
`;
