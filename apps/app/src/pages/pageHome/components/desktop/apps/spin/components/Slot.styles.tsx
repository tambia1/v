import styled from "styled-components";

export const Slot = styled.div`
	width: 100%;
	height: 100%;

	position: relative;
	display: flex;
	align-items: stretch;

	background-color: ${(props) => props.theme.color.normalBg};

	overflow: hidden;
`;

export const SlotScroller = styled.div<{ $numberOfItems: number }>`
	position: absolute;
	width: 100%;
	height: calc(100% * ${(props) => props.$numberOfItems});

	left: 0;
	top: 0;

	filter: blur(0px);
`;

export const Item = styled.div<{ $numberOfItems: number }>`
	width: 100%;
	height: calc(100% / ${(props) => props.$numberOfItems});

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	overflow: hidden;

	border: solid 1px black;
	box-sizing: border-box;

	position: relative;

	font-size: 250%;

	&:nth-child(even) {
		background-color: ${(props) => props.theme.color.normalBg};
	}

	&:nth-child(odd) {
		background-color: ${(props) => props.theme.color.normalBgSelected};
	}
`;
