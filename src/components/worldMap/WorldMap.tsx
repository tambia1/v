import React, { ReactElement, ReactNode } from "react";
import * as S from "./WorldMap.styles";
import { Pin } from "./components/pin/Pin";

interface Props {
	className?: string | undefined;
	map: ReactNode;
	mapWidth: number;
	mapHeight: number;
	mapFixW: number;
	mapFixH: number;
	mapFixX: number;
	mapFixY: number;
	pins: ReactElement[];
}

export const WorldMap = ({ className, map, mapWidth, mapHeight, mapFixX, mapFixY, mapFixW, mapFixH, pins }: Props) => {
	return (
		<S.Container className={className}>
			<S.ContainerMap>{map}</S.ContainerMap>
			<S.ContainerPins>
				{React.Children.map(pins, (pin, index) => {
					const { lng, lat } = pin.props;
					const coords = getWorldMapXY(lng, lat, mapWidth, mapHeight, mapFixW, mapFixH, mapFixX, mapFixY);

					return React.cloneElement(pin, { key: `pin-${index}`, lng: coords.x, lat: coords.y });
				})}
			</S.ContainerPins>
		</S.Container>
	);
};

WorldMap.Pin = Pin;

export const getWorldMapXY = (lng: number, lat: number, imageWidth: number, imageHeight: number, mapFixW: number, mapFixH: number, mapFixX: number, mapFixY: number) => {
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
