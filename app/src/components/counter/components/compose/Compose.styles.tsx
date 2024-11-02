import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const Compose = styled.div`
	width: 20rem;
	height: 4rem;
	padding: 0rem 1.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 2rem;
	box-sizing: border-box;
	border-radius: 1rem;
	border: 1px solid ${(props) => props.theme.color.primaryBgActive};

	color: ${(props) => props.theme.color.primaryFg};
	background-color: ${(props) => props.theme.color.primaryBg};
`;

export const IconCounter = styled(Icon)`
	cursor: pointer;
	flex-shrink: 0;
`;
