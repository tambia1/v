import { Collapsable } from "@src/components/collapsable/Collapsable.styles";
import { Flag } from "@src/components/flag/Flag.styles";
import { Progress as ProgressComponent } from "@src/components/progress/Progress";
import { ProgressValue } from "@src/components/progress/Progress.styles";
import styled, { css } from "styled-components";

export const Page = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	padding: 1rem;
	box-sizing: border-box;

	overflow-y: overlay;
	scrollbar-gutter: stable;
`;

export const Spacer = styled.div`
	width: 100%;
	height: 1rem;
`;

export const Pressable = styled.span`
	cursor: pointer;
`;

export const ListBar = styled.div`
	width: 100%;
	max-width: 50rem;
	height: auto;

	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	justify-content: space-between;
	align-items: center;
`;

export const ListBarCell = styled.div`
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	align-items: center;
	gap: 0.5rem;
	justify-content: end;
`;

export const ListBarFilter = styled.div`
	position: absolute;
	margin-top: 4rem;
`;

export const SubscriptionsList = styled.div`
	width: 100%;
	max-width: 50rem;
	height: auto;

	display: flex;
	flex-direction: column;
	flex-shrink: 0;

	overflow: auto;

	box-shadow: ${(props) => props.theme.shadow.box} ${(props) => props.theme.color.primaryFg};
	border-radius: 1rem;

	background-color: ${(props) => props.theme.color.primaryBg};

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
	align-items: center;
	gap: 0.5rem;
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
		width: 5rem;
		justify-content: left;
	}
	& > div:nth-child(4) {
		width: 5rem;
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
		width: 2rem;
	}
	& > div:nth-child(2) {
		width: 100%;
		flex-shrink: 1;
	}
	& > div:nth-child(3) {
		width: 7rem;
	}
	& > div:nth-child(4) {
		width: 5rem;
	}
	& > div:nth-child(5) {
		width: 2rem;
	}
`;

export const SubscriptionsHeader = styled.div<{ $visible: boolean }>`
	width: auto;
	display: flex;
	height: ${(props) => (props.$visible ? "4rem" : "0rem")};
	transition: all 0.3s ease;
	overflow: hidden;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	white-space: nowrap;
	padding: 0rem 1rem;
	background-color: ${(props) => props.theme.color.primaryBgActive};

	${SubscriptionsWidth}
`;

export const DatabasesHeader = styled.div`
	width: auto;
	height: 2.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	white-space: nowrap;
	padding: 0rem 1rem;
	background-color: #252525;
	color: #A99D5D;

	${DatabasesWidth}
`;

export const DatabasesRows = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: #252525;
`;

export const SubscriptionsLine = styled.div`
	height: 0px;
	width: 100%;
	margin-left: 1rem;
	margin-right: 1rem;
	border-bottom: solid #252525 1px;
`;

export const DatabasesLine = styled.div`
	height: 0px;
	width: 100%;
	margin-left: 1rem;
	margin-right: 1rem;
	border-bottom: dashed #A99D5D 1px;
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

export const ColIcon = styled.div`
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

export const SubscriptionsDetailText = styled.div`
	display: flex;
	align-items: center;
	font-weight: normal;
`;

export const DatabasesText = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	font-weight: normal;
	flex-shrink: 0;
	color: #ffffff
`;

export const DatabaseDetailText = styled.div`
	display: flex;
	align-items: center;
	font-weight: normal;
	color: #ffffff

`;

export const DatabaseDetailTextDisabled = styled.div`
	display: flex;
	align-items: center;
	font-weight: normal;
	color: #999999

`;

export const DatabaseDetailValue = styled.div`
	display: flex;
	align-items: center;
	font-weight: normal;
	color: #A99D5D

`;

export const SubscriptionRow = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	background-color: ${(props) => props.theme.color.primaryBgDisabled};

	&:nth-child(odd){
		background-color: ${(props) => props.theme.color.ternaryBg};
	}
`;

export const SubscriptionsDataRow = styled.div<{ $visible: boolean }>`
	height: ${(props) => (props.$visible ? "4rem" : "0rem")};
	transition: all 0.3s ease;
	overflow: hidden;
	display: flex;
	flex-direction: row;
	padding: 0rem 1rem;
	align-items: center;
	gap: 0.5rem;

	&:hover {
		background-color: ${(props) => props.theme.color.primaryBgHover};
	}

	${SubscriptionsWidth}
`;

export const SubscriptionsDetailsRow = styled.div<{ $visible: boolean }>`
	height: ${(props) => (props.$visible ? "4rem" : "0rem")};
	transition: all 0.3s ease;
	display: flex;
	overflow: hidden;
	flex-direction: row;
	padding: 0rem 1rem;
	align-items: center;
	gap: 1rem;
	background-color: ${(props) => props.theme.color.primaryBg};

	& > div {
		width: auto;
		flex-shrink: 0;
	}
`;

export const SubscriptionsDetailsColMap = styled.div<{ $visible: boolean }>`
	height: ${(props) => (props.$visible ? "15rem" : "0rem")};
	transition: all 0.3s ease;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	padding: 0rem 1rem;
	align-items: center;
	gap: 1rem;
	background-color: ${(props) => props.theme.color.primaryBg};
`;

export const DatabasesRow = styled.div`
	height: 4rem;
	display: flex;
	flex-direction: row;
	padding: 0rem 1rem;
	align-items: center;
	gap: 0.5rem;
	color: #ffffff;
	background-color: #252525;

	&:hover {
		background-color: #454545;
	}

	${DatabasesWidth}
`;

export const DatabasesInfoRow = styled.div`
	display: flex;
	flex-direction: row;
	padding: 1rem;
	align-items: center;
	gap: 1rem;
	color: #ffffff;
	background-color: #252525;
`;

export const DatabasesInfoCell = styled.div`
	display: flex;
	flex-direction: row;
	gap: 0.5rem;
	align-items: center;
`;

export const Progress = styled(ProgressComponent)<{ percent: number }>`
	border: 1px solid #ffffff;

	& ${ProgressValue}{
		background-color: #ffffff;
	}
`;

export const WorldMapContainer = styled.div`
	width: 30rem;
	height: 15rem;
	display: flex;
	justify-content: center;

`;

export const Pin = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	white-space: nowrap;
	transition: scale 0.3s ease;

	&:hover{
		scale: 150%;
	}

	& ${Flag} {
		margin-left: -50%;
		margin-top: -50%;
		width: 100%;
		height: 100%;
		box-shadow: 0px 0px 5px 5px #ffffff88;
	}
`;
