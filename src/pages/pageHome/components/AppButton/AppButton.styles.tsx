import styled from "styled-components";

import calculator from "./../../assets/calculator.png";
import settings from "./../../assets/settings.png";
import camera from "./../../assets/camera.png";
import notes from "./../../assets/notes.png";

const Icons = {
	settings,
	calculator,
	camera,
	notes,
} as const;

export type Icon = keyof typeof Icons;

export const Image = styled.div<{ $icon: Icon }>`
	border-radius: 0.5rem;
	width: 5rem;
	height: 5rem;
	flex-shrink: 0;
	background-image: url(${({ $icon }) => Icons[$icon]});
	background-size: contain;
	background-repeat: no-repeat;
`;

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	flex-direction: column;
	gap: ${(props) => props.theme.size.xs};
	padding: ${(props) => props.theme.size.xs};
	width: 5rem;
	height: 7rem;
	overflow: hidden;
	border-radius: 0.5rem;

	& > * {
		transition: all 0.3s ease;
	}

	&:hover {
		background-color: #00000033;

		${Image} {
			opacity: 0.6;
		}
	}

	&:active {
		background-color: #00000066;

		${Image} {
			opacity: 0.6;
		}
	}
`;

export const Title = styled.div`
	font-size: ${(props) => props.theme.size.s};
`;
