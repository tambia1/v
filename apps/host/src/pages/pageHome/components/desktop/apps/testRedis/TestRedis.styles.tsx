import styled from "@emotion/styled";

export const TestRedis = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primary200};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;
