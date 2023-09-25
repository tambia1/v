import styled, { css, keyframes } from "styled-components";
import { CSS, RuleSet, Styles } from "styled-components/dist/types";

export const Container = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	align-items: center;
	background-color: ${(props) => props.theme.color.normalFgDisabled};
`;
