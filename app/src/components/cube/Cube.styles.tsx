import styled, { css } from "styled-components";

export const Cube = styled.div`
	width: 100%;
	height: 100%;
`;

export const Scene = styled.div<{ $width: number; $height: number }>`
	width: ${(props) => props.$width}px;
	height: ${(props) => props.$height}px;
	perspective: 800px;
`;

export const Container = styled.div<{ $width: number; $height: number; $depth: number; $x: number; $y: number; $z: number; $rotateX: number; $rotateY: number; $rotateZ: number }>`
	width: ${(props) => props.$width}px;
	height: ${(props) => props.$height}px;
	position: relative;
	transform-style: preserve-3d;
	transform: translateX(${(props) => props.$x}px) translateY(${(props) => props.$y}px) translateZ(${(props) => props.$z}px) rotateX(${(props) => props.$rotateX}deg)
		rotateY(${(props) => props.$rotateY}deg) rotateZ(${(props) => props.$rotateZ}deg);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Face = css`
	position: absolute;

	display: flex;
	justify-content: center;
	align-items: center;

	transform-origin: 50% 50%;
`;

export const Front = styled.div<{ $width: number; $height: number; $depth: number }>`
	${Face}
	width: ${(props) => props.$width}px;
	height: ${(props) => props.$height}px;
	background-color: #f84d4dbb;
	transform: translateX(0px) translateY(0px) translateZ(${(props) => props.$depth / 2}px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
`;

export const Back = styled.div<{ $width: number; $height: number; $depth: number }>`
	${Face}
	width: ${(props) => props.$width}px;
	height: ${(props) => props.$height}px;
	background-color: #86ff4dbb;
	transform: translateX(0px) translateY(0px) translateZ(${(props) => -props.$depth / 2}px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
`;

export const Left = styled.div<{ $width: number; $height: number; $depth: number }>`
	${Face}
	width: ${(props) => props.$depth}px;
	height: ${(props) => props.$height}px;
	background-color: #89ffffbb;
	transform: translateX(${(props) => -props.$width / 2}px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(-90deg) rotateZ(0deg);
`;

export const Right = styled.div<{ $width: number; $height: number; $depth: number }>`
	${Face}
	width: ${(props) => props.$depth}px;
	height: ${(props) => props.$height}px;
	background-color: #ffff4dbb;
	transform: translateX(${(props) => props.$width / 2}px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(90deg) rotateZ(0deg);
`;

export const Top = styled.div<{ $width: number; $height: number; $depth: number }>`
	${Face}
	width: ${(props) => props.$width}px;
	height: ${(props) => props.$depth}px;
	background-color: #6057ffbb;
	transform: translateX(0px) translateY(${(props) => -props.$height / 2}px) translateZ(0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg);
`;

export const Bottom = styled.div<{ $width: number; $height: number; $depth: number }>`
	${Face}
	width: ${(props) => props.$width}px;
	height: ${(props) => props.$depth}px;
	background-color: #f84cffbb;
	transform: translateX(0px) translateY(${(props) => props.$height / 2}px) translateZ(0px) rotateX(90deg) rotateY(0deg) rotateZ(0deg);
`;
