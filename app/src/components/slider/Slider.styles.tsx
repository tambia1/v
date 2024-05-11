import styled from "styled-components";

export const Slider = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin: 0.5rem;
`;

export const SliderInput = styled.input`
	width: 100%;
	height: 0.8rem;
	border-radius: 0.5rem;
	background: #d3d3d3;
	outline: none;
	opacity: 0.7;
	transition: opacity 0.2s;
	appearance: none;

	&:hover {
		opacity: 1;
	}

	&::-webkit-slider-thumb {
		appearance: none;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background: #4caf50;
		cursor: pointer;
	}
`;
