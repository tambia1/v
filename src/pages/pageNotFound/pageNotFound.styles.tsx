import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Box = styled.div`
	position: relative;
	width: 300px;
	height: 100px;
	box-sizing: border-box;
	color: ${(props) => props.theme.color.normalFg};

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-color: #0008;
	border-radius: 5px;
`;

export const Text = styled.div`
	display: inline-flex;
	padding-bottom: 6px;
	align-self: flex-start;
	color: ${(props) => props.theme.color.normalFg};
	font-size: ${(props) => props.theme.size.m};
`;

export const Title = styled.div`
	display: inline-flex;
	padding-bottom: 6px;
	color: ${(props) => props.theme.color.normalFg};
	font-size: ${(props) => props.theme.size.l};
`;
