import React, { type ReactElement, type ReactNode, useEffect, useRef, useState } from "react";
import * as S from "./WorldMap.styles";
import { Pin } from "./components/pin/Pin";

const MAP_FIX_W = -0.05;
const MAP_FIX_H = 0.833;
const MAP_FIX_X = -0.035;
const MAP_FIX_Y = 0.11;

type Props = {
	className?: string;
	map: ReactNode;
	mapFixW?: number;
	mapFixH?: number;
	mapFixX?: number;
	mapFixY?: number;
	pins: ReactElement[];
};

export const WorldMap = ({ className, map, mapFixX = MAP_FIX_X, mapFixY = MAP_FIX_Y, mapFixW = MAP_FIX_W, mapFixH = MAP_FIX_H, pins }: Props) => {
	const mapRef = useRef<HTMLDivElement>(null);

	const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			updateMapSize();
		});

		if (mapRef.current) {
			resizeObserver.observe(mapRef.current);
		}

		return () => {
			if (mapRef.current) {
				resizeObserver.unobserve(mapRef.current);
			}
		};
	}, [mapRef]);

	useEffect(() => {
		updateMapSize();
	}, []);

	const updateMapSize = () => {
		if (mapRef.current) {
			const boundingRect = mapRef.current.getBoundingClientRect();

			setMapSize({
				width: boundingRect.width,
				height: boundingRect.height,
			});
		}
	};
	return (
		<S.WorldMap ref={mapRef} className={className}>
			<S.ContainerMap>{map}</S.ContainerMap>
			<S.ContainerPins>
				{React.Children.map(pins, (pin, index) => {
					const { lng, lat } = pin.props;
					const coords = getXYFromLngLat(lng, lat, mapSize.width, mapSize.height, mapFixW, mapFixH, mapFixX, mapFixY);

					return React.cloneElement(pin, { key: `pin-${index}`, lng: coords.x, lat: coords.y });
				})}
			</S.ContainerPins>
		</S.WorldMap>
	);
};

WorldMap.Pin = Pin;
WorldMap.Map = S.Map;

const getXYFromLngLat = (
	lng: number,
	lat: number,
	imageWidth: number,
	imageHeight: number,
	mapFixW: number,
	mapFixH: number,
	mapFixX: number,
	mapFixY: number,
) => {
	const fixW = imageWidth * mapFixW;
	const fixH = imageHeight * mapFixH;
	const fixX = imageWidth * mapFixX;
	const fixY = imageHeight * mapFixY;

	imageWidth += fixW;
	imageHeight += fixH;

	let x = (lng + 180) * (imageWidth / 360);

	const latRad = (lat * Math.PI) / 180;
	const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));

	let y = imageHeight / 2 - (imageWidth * mercN) / (2 * Math.PI) / (imageWidth / imageHeight);

	x = x + fixX - fixW / 2;
	y = y + fixY - fixH / 2;

	return { x, y };
};
