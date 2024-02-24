import { Icon } from "@src/icons/Icon";
import styled from "styled-components";

export const TestSelect = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const IconCheck = styled(Icon).attrs({
	iconName: "iconCheck",
})`
	margin-left: auto;
`;
