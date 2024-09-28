import styled from "styled-components";

export const Pin = styled.div<{ $lng: number; $lat: number }>`
	position: absolute;
	width: 10px;
	height: 10px;
	margin-top: ${({ $lat }) => `${$lat}px`};
	margin-left: ${({ $lng }) => `${$lng}px`};
	transform: translate(-50%, -50%);
	color: ${(props) => props.theme.color.normalBg};
`;
