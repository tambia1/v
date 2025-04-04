import { Icon } from "@src/components/icon/Icon.styles";
import styled from "styled-components";

export const Camera = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primary100};
`;

export const Video = styled.video`
	position: absolute;
	display: flex;
	width: 100%;
	height: 100%;
	background-color: ${(props) => props.theme.color.primary100};
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
		stroke: ${(props) => props.theme.color.primary700};
		fill: ${(props) => props.theme.color.success900};
	}

	& ${Icon}[data-name='iconCamera'] svg {
		stroke: ${(props) => props.theme.color.primary700};
		fill: ${(props) => props.theme.color.info900};
	}

	& ${Icon} svg {
		stroke: ${(props) => props.theme.color.primary700};
		fill: ${(props) => props.theme.color.primary100};
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
