import styled from "@emotion/styled";

export const Compose = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	inset: 0;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: ${(props) => props.theme.color.primary900}66;


	z-index: 100;
`;
