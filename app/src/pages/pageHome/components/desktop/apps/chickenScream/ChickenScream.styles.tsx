import styled from "styled-components";
import ground from "./assets/ground.png";

export const ChickenScream = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-image: linear-gradient(0deg, #32AE7F, #04B4C6); 
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	align-items: center;
`;

export const Col = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Chicken = styled.div<{ $isJumping: boolean }>`
	position: absolute;
	left: 2rem;
	bottom: ${(props) => (props.$isJumping ? "7rem" : "5rem")};

	font-size: 50%;

	transition: all 0.3s ease;
`;

export const Ground = styled.div.attrs<{ $x: number }>((props) => ({
	style: {
		backgroundPosition: `${-props.$x}px 0px`,
	},
}))`
	position: absolute;
	height: 5.5rem;
	left: 0rem;
	right: 0rem;
	bottom: 0rem;
	background-image: url(${ground});
	background-size: contain; 
	background-repeat: repeat-x; 
`;

export const Sun = styled.div`
	position: absolute;
	right: 5rem;
	bottom: 22rem;
`;
