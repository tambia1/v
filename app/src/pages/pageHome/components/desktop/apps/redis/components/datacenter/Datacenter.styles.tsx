import { Collapsable } from "@src/components/collapsable/Collapsable.styles";
import { Progress as ProgressComponent } from "@src/components/progress/Progress";
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

export const SubscriptionsList = styled.div`
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

	& > div:last-child > div:last-child {
		display: none;
	}
`;

export const DatabasesList = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;

	& > ${Collapsable} {
		width: 100%;
	}
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

const SubscriptionsWidth = css`
	& > div {
		flex-shrink: 0;
		justify-content: center;
	}

	& > div:nth-child(1) {
		width: 2rem;
	}
	& > div:nth-child(2) {
		width: 100%;
		flex-shrink: 1;
		justify-content: left;
	}
	& > div:nth-child(3) {
		width: 4rem;
		justify-content: left;
	}
	& > div:nth-child(4) {
		width: 2rem;
	}
	& > div:nth-child(5) {
		width: 2rem;
	}
	& > div:nth-child(6) {
		width: 2rem;
	}
`;

const DatabasesWidth = css`
	& > div {
		flex-shrink: 0;
	}

	& > div:nth-child(1) {
		width: 100%;
		flex-shrink: 1;
	}
	& > div:nth-child(2) {
		width: 5rem;
	}
	& > div:nth-child(3) {
		width: 5rem;
	}
	& > div:nth-child(4) {
		width: 2rem;
	}
`;

export const SubscriptionsHeader = styled.div`
	width: auto;
	height: auto;
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
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
	gap: 0.5rem;
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
	justify-content: center;
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

export const SubscriptionsRow = styled.div`
	display: flex;
	flex-direction: row;
	padding: 1rem;
	align-items: center;
	gap: 0.5rem;
	background-color: ${(props) => props.theme.color.normalBg};

	&:hover {
		background-color: ${(props) => props.theme.color.normalBgHover};
	}

	${SubscriptionsWidth}
`;

export const DatabasesRow = styled.div`
	display: flex;
	flex-direction: row;
	padding: 1rem;
	align-items: center;
	gap: 0.5rem;
	background-color: ${(props) => props.theme.color.normalBg};

	&:hover {
		background-color: ${(props) => props.theme.color.normalBgHover};
	}

	${DatabasesWidth}
`;

export const Progress = styled(ProgressComponent)<{ percent: number }>`
	border: 1px solid ${({ theme }) => theme.color.normalFg};

	& > div > div {
		background-color: ${({ theme }) => theme.color.normalFg};
		background: linear-gradient(90deg, #4cae4c 0%, #4cae4c 60%, #f0ad4e ${({ percent }) => `${180 - percent}%`}, #ff0000 ${({ percent }) => `${200 - percent}%`});
	}
`;
