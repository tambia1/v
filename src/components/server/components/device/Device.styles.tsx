import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const Container = styled.div`
	width: auto;
	height: 100%;
	overflow: hidden;
	min-width: 15rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	border: solid 0.1rem #aaaaaa;
	border-radius: 1rem;
	box-sizing: border-box;

	padding: 0.5rem;

	background-color: #ffffff;
`;

export const ContainerTitle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
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

export const Databases = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const IconAdd = styled(Icon).attrs((props) => ({
	size: "m",
}))`
	& > div {
		cursor: pointer;
		margin-top: 0.2rem;
		color: limegreen;

		&:hover {
			color: green;
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
