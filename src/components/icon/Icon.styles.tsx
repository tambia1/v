import { Size } from "@src/types/Sizes";
import { ReactSVG } from "react-svg";
import styled from "styled-components";
import imageDown from "./assets/arrow-down.svg";
import imageLeft from "./assets/arrow-left.svg";
import imageLink from "./assets/arrow-right-circle.svg";
import imageRight from "./assets/arrow-right.svg";
import imageUp from "./assets/arrow-up.svg";
import imageVCircle from "./assets/check-circle.svg";
import imageDatabase from "./assets/database.svg";
import imageMinusCircle from "./assets/minus-circle.svg";
import imagePlusCircle from "./assets/plus-circle.svg";
import imageRedisDisk from "./assets/redis-disk.svg";
import imageRedisFlash from "./assets/redis-flash.svg";
import imageRedisReplica from "./assets/redis-replica.svg";
import imageRedisPrimary from "./assets/redis.svg";
import imageXCircle from "./assets/x-circle.svg";

const Icons = {
	redisPrimary: imageRedisPrimary,
	redisReplica: imageRedisReplica,
	redisFlash: imageRedisFlash,
	redisDisk: imageRedisDisk,

	xCircle: imageXCircle,
	vCircle: imageVCircle,

	plusCircle: imagePlusCircle,
	minusCircle: imageMinusCircle,

	database: imageDatabase,

	link: imageLink,

	imageLeft: imageLeft,
	imageRight: imageRight,
	imageUp: imageUp,
	imageDown: imageDown,
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
	color: #000000;

	& > div {
		width: 100%;
		height: 100%;

		& > svg {
			width: 100%;
			height: 100%;
		}
	}
`;
