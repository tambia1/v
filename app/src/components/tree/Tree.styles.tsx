import { Icon } from "@src/components/icon/Icon";
import styled from "styled-components";

export const Tree = styled.div`
	display: flex;
	flex-direction: column;

	color: ${(props) => props.theme.color.primaryFgEnabled};
	background-color: ${(props) => props.theme.color.primaryBgEnabled};
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

	color: ${(props) => props.theme.color.secondaryFgEnabled};
	background-color: ${(props) => props.theme.color.primaryBgEnabled};

	&:hover {
		color: ${(props) => props.theme.color.primaryFgHover};
		background-color: ${(props) => props.theme.color.primaryBgHover};
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
	${(props) => props.$highlighted && `color: ${props.theme.color.errorFg};`}
	padding: 0.5rem;
`;

export const TreeItem = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0.1rem;

	color: ${(props) => props.theme.color.primaryFgEnabled};
	background-color: ${(props) => props.theme.color.primaryBgEnabled};

	&:hover {
		color: ${(props) => props.theme.color.primaryFgHover};
		background-color: ${(props) => props.theme.color.primaryBgHover};
	}

	cursor: pointer;
`;

export const TreeItemContent = styled.div<{ highlighted: boolean }>`
	${(props) => props.highlighted && `color: ${props.theme.color.errorFg};`}
	padding: 0.5rem;
`;

export const TreeItemSelect = styled.div`
	padding: 0.5rem;
`;

export const IconFolder = styled(Icon)`
	& > div > div > svg {
		stroke: ${(props) => props.theme.color.primaryFgActive};
	}
`;
