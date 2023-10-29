import styled from "styled-components";

export const PageSettings = styled.div`
	width: 100%;
	height: 100%;

	display: flex;

	animation: appear ease 0.3s both;

	@keyframes appear {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;
