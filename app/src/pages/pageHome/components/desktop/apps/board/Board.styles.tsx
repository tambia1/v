import styled from "@emotion/styled";
import { Icon } from "@src/components/icon/Icon";

const MOBILE_WIDTH = "700px";

export const Board = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.primary200};

	overflow: auto;
`;

export const Column = styled.div`
	width: 100%;
	min-height: 25rem;
	display: flex;
	flex-direction: column;
	box-shadow: ${(props) => props.theme.shadow.box} ${(props) => props.theme.color.primary800};
	min-width: 0;
	transition: all 0.3s ease;

	@media (max-width: ${MOBILE_WIDTH}) {
		flex-shrink: 0;
	}
`;

export const ColumnHeader = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	flex-shrink: 0;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};
	position: relative;
`;

export const Columns = styled.div`
	width: auto;
	height: auto;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	margin: 1rem;


	& > ${Column}:nth-child(1) ${ColumnHeader} {
		background-color: #f48897;
	}
	& > ${Column}:nth-child(2) ${ColumnHeader} {
		background-color: #f4e688;
	}
	& > ${Column}:nth-child(3) ${ColumnHeader} {
		background-color: #88f48e;
	}
	& > ${Column}:nth-child(4) ${ColumnHeader} {
		background-color: #88e2f4;
	}

	@media (min-width: ${MOBILE_WIDTH}) {
		flex-direction: row;
	}
`;

export const ColumnBody = styled.div<{ $isDragOn: boolean }>`
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => (props.$isDragOn ? props.theme.color.primary700 : props.theme.color.primary100)};
	padding: 1rem;
	gap: 0.5rem;
	overflow-x: hidden;
	overflow-y: auto;
	box-sizing: border-box;
	transition: all 0.3s ease;
`;

export const Task = styled.div<{ $isDragOn: boolean }>`
	display: flex;
	width: auto;
	min-height: 5rem;
	padding: 0.5rem;
	box-shadow: ${(props) => props.theme.shadow.box} ${(props) => props.theme.color.primary800};
	overflow: hidden;
	transition: all 0.3s ease;

	background-color: ${(props) => (props.$isDragOn ? props.theme.color.primary700 : props.theme.color.primary100)};

	&:hover {
		background-color: ${(props) => props.theme.color.primary600};
	}
`;

export const HeaderText = styled.div``;

export const HeaderIconBase = styled(Icon)`
	position: absolute;
	right: 1rem;

	padding: 1rem;
	border-radius: 0.5rem;

	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		color: ${(props) => props.theme.color.primary400};
		background-color: ${(props) => props.theme.color.primary600};
	}
`;

export const HeaderIcon = (props: React.ComponentProps<typeof Icon>) => <HeaderIconBase fill="#00ff00" stroke="#000000" {...props} />;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
