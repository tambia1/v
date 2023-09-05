import styled from "styled-components";
import { Icon } from "../icon/Icon";

export const Server = styled.div`
	width: auto;
	height: auto;

	overflow: hidden;

	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 1rem;

	border: solid 0.1rem #aaaaaa;
	border-radius: 1rem;
	box-sizing: border-box;

	padding: 0.5rem;

	background-color: #ffffff;

	transition: all 0.3s ease;
`;

export const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #000000;
	text-decoration: underline;
`;

export const Text = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #666666;
`;

export const Devices = styled.div`
	width: auto;

	display: flex;
	align-items: start;
	flex-direction: row;
	gap: 1rem;

	border: solid 0.1rem #aaaaaa;
	border-radius: 1rem;
	box-sizing: border-box;

	padding: 0.5rem;
`;

export const ContainerTitle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
`;

export const IconDelete = styled(Icon).attrs((props) => ({
	size: "m",
}))`
	& > div {
		cursor: pointer;
		margin-top: 0.2rem;
		color: tomato;

		&:hover {
			color: red;
		}
	}
`;

export const IconDevice = styled.div<{ $iconName: string }>`
	display: flex;
	width: 20px;
	height: 20px;
	background-image: url($iconName);
	background-size: contain;
	background-repeat: no-repeat;
`;
