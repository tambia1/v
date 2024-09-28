import styled from "styled-components";

export const Pin = styled.div<{ $lng: number; $lat: number }>`
	position: absolute;
	width: 1px;
	height: 1px;
	background-color: red;
	margin-top: ${({ $lat }) => `${$lat}px`};
	margin-left: ${({ $lng }) => `${$lng}px`};
	color: ${(props) => props.theme.color.normalBg};
`;
