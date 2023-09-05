import styled, { css } from "styled-components";

export const MenuItem = styled.button<{ $isSelected: boolean }>`
	display: flex;
	align-items: center;
	font-size: 12px;
	padding: 10px;
	width: 100%;
	overflow: hidden;

	background-color: transparent;
	color: inherit;
	font-family: inherit;
	border: none;

	transition: all ease-out 0.3s;

	&:hover {
		background-color: #0003;
		cursor: pointer;
	}

	&:active {
		background-color: #0009;
	}

	${(props) => {
		return (
			props.$isSelected &&
			css`
				background-color: #0006;
			`
		);
	}}
`;
