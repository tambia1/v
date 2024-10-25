import styled from "styled-components";

export const Section = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	margin-top: 2rem;
	margin-bottom: 1rem;
	max-width: 40rem;
	white-space: nowrap;
	font-size: ${(props) => props.theme.font.header.size};
	font-weight: ${(props) => props.theme.font.header.weight};

`;
