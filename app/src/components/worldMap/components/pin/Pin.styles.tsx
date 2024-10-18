import styled from "styled-components";

export const Pin = styled.div<{ $lng: number; $lat: number }>`
	position: absolute;
	width: 3px;
	height: 3px;
	background-color: ${(props) => props.theme.color.errorFg};
	margin-top: ${({ $lat }) => `${$lat}px`};
	margin-left: ${({ $lng }) => `${$lng}px`};
	color: ${(props) => props.theme.color.primaryBg};
	border-radius: 3px;
`;
