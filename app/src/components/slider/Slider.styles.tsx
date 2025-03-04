import styled from "styled-components";

export const Slider = styled.div<{ $width: string }>`
	width: ${(props) => props.$width};
	display: flex;
	align-items: center;
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
`;

export const SliderInput = styled.input`
	width: 100%;
	height: 0.8rem;
	border-radius: 0.5rem;
	background: #d3d3d3;
	outline: none;
	appearance: none;

	&::-webkit-slider-thumb {
		appearance: none;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: #4caf50;
		cursor: pointer;
	}
`;
