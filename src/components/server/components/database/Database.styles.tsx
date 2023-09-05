import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const Container = styled.div`
	width: auto;
	height: auto;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	border: solid 0.1rem #aaaaaa;
	border-radius: 1rem;

	padding: 0.5rem;

	background-color: #ffffff;

	&[data-link="src"] {
		background-color: #dddddd;
	}

	&[data-link="trg"] {
		background-color: #ddffdd;
		transition: all 0.3s ease;
	}
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
	white-space: nowrap;
`;

export const SubText = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #666666;
	white-space: nowrap;
	font-size: 0.8rem;
	width: 3rem;
	flex-shrink: 0;
`;

export const IconDelete = styled(Icon).attrs((props) => ({
	size: "m",
}))`
	& > div {
		margin-top: 0.2rem;
		color: tomato;

		&:hover {
			color: red;
			cursor: pointer;
		}
	}
`;

export const IconRight = styled(Icon).attrs((props) => ({
	size: "m",
}))`
	& > div {
		margin-top: 0.2rem;
		color: grey;

		&:hover {
			color: red;
			cursor: pointer;
		}
	}
`;

export const IconType = styled(Icon).attrs((props) => ({
	size: "m",
}))`
	& > div {
		margin-top: 0.2rem;
	}
`;

export const IconDatabase = styled.div<{ iconName: string }>`
	display: flex;
	width: 20px;
	height: 20px;
	background-image: url(${({ iconName }) => iconName});
	background-size: contain;
	background-repeat: no-repeat;
`;

export const ContainerTitle = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
`;

export const ContainerMemory = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
`;
