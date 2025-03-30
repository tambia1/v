import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const Tree = styled.div`
	display: flex;
	flex-direction: column;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};
`;

export const TreeNode = styled.div`
	display: flex;
	flex-direction: column;
`;

export const TreeFolder = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	cursor: pointer;
`;

export const TreeFolderHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0.1rem;

	color: ${(props) => props.theme.color.secondary900};
	background-color: ${(props) => props.theme.color.primary100};

	&:hover {
		color: ${(props) => props.theme.color.primary400};
		background-color: ${(props) => props.theme.color.primary600};
	}
`;

export const TreeFolderBody = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 3rem;
`;

export const TreeFolderExpand = styled.div``;

export const TreeFolderSelect = styled.div`
	padding: 0.5rem;
	cursor: pointer;
`;

export const TreeFolderContent = styled.div<{ $highlighted: boolean }>`
	${(props) => props.$highlighted && `color: ${props.theme.color.danger500};`}
	padding: 0.5rem;
`;

export const TreeItem = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0.1rem;

	color: ${(props) => props.theme.color.primary800};
	background-color: ${(props) => props.theme.color.primary100};

	&:hover {
		color: ${(props) => props.theme.color.primary400};
		background-color: ${(props) => props.theme.color.primary600};
	}

	cursor: pointer;
`;

export const TreeItemContent = styled.div<{ highlighted: boolean }>`
	${(props) => props.highlighted && `color: ${props.theme.color.danger500};`}
	padding: 0.5rem;
`;

export const TreeItemSelect = styled.div`
	padding: 0.5rem;
`;

export const IconFolder = styled(Icon)`
	& > div > div > svg {
		stroke: ${(props) => props.theme.color.primary700};
	}
`;
