import styled from "styled-components";
import imageWorldMapLight from "./assets/world-map-light.png";
import imageWorldMapDark from "./assets/world-map-dark.png";

export const WorldMap = styled.div`
	width: fit-content;
	height: fit-content;
	display: flex;
	position: relative;
`;

export const ContainerMap = styled.div``;

export const ContainerPins = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
`;

export const Map = styled.div`
	position: relative;
	width: 700px;
	height: 300px;

	background-image: url(${(props) => (props.theme.themeName === "dark" ? imageWorldMapDark : imageWorldMapLight)});
	background-repeat: no-repeat;
	background-size: 100% 100%;
`;
