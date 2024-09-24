import { Collapsable } from "@src/components/collapsable/Collapsable.styles";
import styled, { css } from "styled-components";

export const Page = styled.div`
	width: auto;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;
`;

export const Pressable = styled.span`
	cursor: pointer;
`;

export const List = styled.div`
	width: 100%;
	max-width: 50rem;
	height: auto;

	display: flex;
	flex-direction: column;
	flex-shrink: 0;

	overflow: auto;

	box-shadow: ${(props) => props.theme.color.shadow} ${(props) => props.theme.color.normalFg};
	border-radius: 1rem;

	background-color: ${(props) => props.theme.color.normalBg};
`;

const SubscriptionsWidth = css`
	& div {
		flex-shrink: 0;
	}

	& div:nth-child(1) {
		width: 3rem;
	}
	& div:nth-child(2) {
		width: 100%;
		flex-shrink: 1;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		display: inline;
	}
	& div:nth-child(3) {
		width: 6rem;
	}
	& div:nth-child(4) {
		width: 8rem;
	}
	& div:nth-child(5) {
		width: 3rem;
	}
	& div:nth-child(6) {
		width: 3rem;
	}
`;

const DatabasesWidth = css`
	& div {
		flex-shrink: 0;
	}

	& div:nth-child(1) {
		width: 100%;
		flex-shrink: 1;
	}
	& div:nth-child(2) {
		width: 6rem;
	}
	& div:nth-child(3) {
		width: 6rem;
	}
	& div:nth-child(4) {
		width: 3rem;
	}
`;

export const SubscriptionsHeader = styled.div`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: row;
	white-space: nowrap;
	padding: 1rem;
	padding-top: 2rem;
	padding-bottom: 1.5rem;
	background-color: ${(props) => props.theme.color.normalBgActive};

	${SubscriptionsWidth}
`;

export const DatabasesHeader = styled.div`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: row;
	white-space: nowrap;
	padding: 0.5rem 1rem;
	background-color: ${(props) => props.theme.color.accentBgHover};

	${DatabasesWidth}
`;

export const SubscriptionsLine = styled.div`
	height: 0px;
	width: 100%;
	margin-left: 1rem;
	margin-right: 1rem;
	border-bottom: solid ${(props) => props.theme.color.normalFgSelected} 1px;
`;

export const DatabasesLine = styled.div`
	height: 0px;
	width: 100%;
	margin-left: 1rem;
	margin-right: 1rem;
	border-bottom: dashed ${(props) => props.theme.color.normalFgSelected} 1px;
`;

export const Cell = styled.div`
	width: 100%;
	height: auto;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};

	box-sizing: border-box;

	display: flex;
	flex-direction: column;

	overflow: hidden;
	border-radius: 0rem 0rem 0rem 0rem;

	padding: 1rem;
`;

export const IconCollapse = styled.div<{ $collapsed: boolean }>`
	width: 2rem;
	height: 100%;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	cursor: pointer;

	& > div {
		transition: all 0.3s ease;
		transform: rotateZ(${({ $collapsed }) => ($collapsed ? -180 : 0)}deg);
		transform-origin: 50% 50%;
	}
`;

export const IconRight = styled.div`
	width: 2rem;
	height: 100%;
	display: flex;
	align-items: center;
	flex-shrink: 0;
	cursor: pointer;
	flex-shrink: 0;
`;

export const SubscriptionsText = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
`;

export const DatabasesText = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	font-weight: normal;
	flex-shrink: 0;
`;

export const Col = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

export const Row = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
`;

export const SubscriptionsRow = styled.div`
	display: flex;
	flex-direction: row;
	padding: 1rem;
	background-color: ${(props) => props.theme.color.normalBg};

	&:hover {
		background-color: ${(props) => props.theme.color.normalBgHover};
	}

	${SubscriptionsWidth}
`;

export const Databases = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;

	& > ${Collapsable} {
		width: 100%;
	}
`;

export const DatabasesRow = styled.div`
	display: flex;
	flex-direction: row;
	padding: 1rem;

	background-color: ${(props) => props.theme.color.normalBg};

	&:hover {
		background-color: ${(props) => props.theme.color.normalBgHover};
	}

	${DatabasesWidth}
`;
