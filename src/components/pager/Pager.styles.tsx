import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;
	background-color: #eeeeee;
`;

export const Bodies = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	position: relative;
	overflow: hidden;
	background-color: ${(props) => props.theme.color.normalBgActive};
`;

export const Text = styled.div`
	display: flex;
	align-items: center;
	margin-left: 1rem;
`;

export const Back = styled.div`
	width: 3rem;
	height: 3rem;
	display: flex;
	align-items: center;
`;

export const BackContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	margin-left: 1rem;
	border-radius: 1rem;
	color: ${(props) => props.theme.color.accentFg};

	&:active {
		color: ${(props) => props.theme.color.normalFgActive};
	}
`;
