import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const TestSelect = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primaryBgSelected};
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const IconCheck = styled(Icon).attrs({
	iconName: "iconCheck",
})`
	margin-left: auto;
`;
