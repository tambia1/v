import styled from "styled-components";
import imageWorldMapDark from "./assets/world-map-dark.png";
import imageWorldMapLight from "./assets/world-map-light.png";

export const WorldMap = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
`;

export const ContainerMap = styled.div`
	width: 100%;
	height: 100%;
`;

export const ContainerPins = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
`;

export const Map = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	background-image: url(${(props) => (props.theme.themeName === "dark" ? imageWorldMapDark : imageWorldMapLight)});
	background-repeat: no-repeat;
	background-size: 100% 100%;
`;
