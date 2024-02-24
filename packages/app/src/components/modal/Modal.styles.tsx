import styled from "styled-components";

export const Modal = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	inset: 0;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: #ffffff88;
	border-radius: 5px;

	z-index: 100;
`;
