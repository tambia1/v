import { Size } from "@src/types/Sizes";
import { ReactSVG } from "react-svg";
import styled from "styled-components";
import vCircle from "./assets/check-circle.svg";
import minusCircle from "./assets/minus-circle.svg";
import moon from "./assets/moon.svg";
import plusCircle from "./assets/plus-circle.svg";
import sun from "./assets/sun.svg";
import xCircle from "./assets/x-circle.svg";
import left from "./assets/arrow-left.svg";
import right from "./assets/arrow-right.svg";
import up from "./assets/arrow-up.svg";
import down from "./assets/arrow-down.svg";
import leftCircle from "./assets/arrow-left-circle.svg";
import rightCircle from "./assets/arrow-right-circle.svg";
import upCircle from "./assets/arrow-up-circle.svg";
import downCircle from "./assets/arrow-down-circle.svg";

const Icons = {
	left,
	right,
	up,
	down,

	leftCircle,
	rightCircle,
	upCircle,
	downCircle,

	xCircle,
	vCircle,

	plusCircle,
	minusCircle,

	sun,
	moon,
} as const;

export type IconsName = keyof typeof Icons;

const sizes: { [K in Size]: { width: string; height: string } } = {
	xs: { width: "0.8rem", height: "0.8rem" },
	s: { width: "1rem", height: "1rem" },
	m: { width: "1.2rem", height: "1.2rem" },
	l: { width: "1.4rem", height: "1.2rem" },
	xl: { width: "1.8rem", height: "1.8rem" },
};

export const Container = styled.div<{ size: Size }>`
	width: ${({ size }) => sizes[size].width};
	height: ${({ size }) => sizes[size].height};
`;

export const Icon = styled(ReactSVG).attrs<{ $iconName: IconsName }>((props) => ({
	src: Icons[props.$iconName],
}))<{ $iconName: IconsName }>`
	width: 100%;
	height: 100%;

	& > div {
		width: 100%;
		height: 100%;

		& > svg {
			width: 100%;
			height: 100%;
		}
	}
`;
