import { ITheme } from "@src/themes/Theme.types";
import styled from "styled-components";

import calculator from "./../../assets/calculator.png";
import settings from "./../../assets/settings.png";

const Icons = {
	settings,
	calculator,
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
	gap: ${({ theme }: { theme: ITheme }) => theme.size.xs};
	padding: ${({ theme }: { theme: ITheme }) => theme.size.xs};
	width: 5rem;
	height: 7rem;
	overflow: hidden;

	& > * {
		transition: all 0.3s ease;
	}

	&:hover {
		${Image} {
			opacity: 0.6;
		}
	}
`;

export const Title = styled.div`
	font-size: ${({ theme }: { theme: ITheme }) => theme.size.s};
`;
