import React, { ReactElement, ReactNode } from "react";
import * as S from "./WorldMap.styles";
import { Pin } from "./components/pin/Pin";

const MAP_WIDTH = 350;
const MAP_HEIGHT = 150;
const MAP_FIXW = -70;
const MAP_FIXH = 125;
const MAP_FIXX = -35;
const MAP_FIXY = 20;

type Props = {
	className?: string | undefined;
	map: ReactNode;
	mapWidth?: number;
	mapHeight?: number;
	mapFixW?: number;
	mapFixH?: number;
	mapFixX?: number;
	mapFixY?: number;
	pins: ReactElement[];
};

export const WorldMap = ({ className, map, mapWidth = MAP_WIDTH, mapHeight = MAP_HEIGHT, mapFixX = MAP_FIXX, mapFixY = MAP_FIXY, mapFixW = MAP_FIXW, mapFixH = MAP_FIXH, pins }: Props) => {
	return (
		<S.WorldMap className={className}>
			<S.ContainerMap>{map}</S.ContainerMap>
			<S.ContainerPins>
				{React.Children.map(pins, (pin, index) => {
					const { lng, lat } = pin.props;
					const coords = getWorldMapXY(lng, lat, mapWidth, mapHeight, mapFixW, mapFixH, mapFixX, mapFixY);

					return React.cloneElement(pin, { key: `pin-${index}`, lng: coords.x, lat: coords.y });
				})}
			</S.ContainerPins>
		</S.WorldMap>
	);
};

WorldMap.Pin = Pin;

const getWorldMapXY = (lng: number, lat: number, imageWidth: number, imageHeight: number, mapFixW: number, mapFixH: number, mapFixX: number, mapFixY: number) => {
	imageWidth += mapFixW;
	imageHeight += mapFixH;

	let x = (lng + 180) * (imageWidth / 360);

	const latRad = (lat * Math.PI) / 180;
	const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));

	let y = imageHeight / 2 - (imageWidth * mercN) / (2 * Math.PI) / (imageWidth / imageHeight);

	x = x + mapFixX - mapFixW / 2;
	y = y + mapFixY - mapFixH / 2;

	return { x, y };
};
