import styled from "styled-components";

export const TestTree = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};

	overflow-y: auto;
`;

export const Tree = styled.div`
	display: flex;
	flex-direction: column;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const TreeNode = styled.div`
	display: flex;
	flex-direction: column;
`;

export const TreeFolder = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
`;

export const TreeFolderHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0.1rem;
	padding: 0.5rem;
	gap: 0.5rem;

	color: ${(props) => props.theme.color.accentFg};
	background-color: ${(props) => props.theme.color.normalBgActive};

	&:hover {
		color: ${(props) => props.theme.color.accentFgHover};
		background-color: ${(props) => props.theme.color.accentBgHover};
	}
`;

export const TreeFolderBody = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 3rem;
`;

export const TreeFolderExpand = styled.div`
	cursor: pointer;
`;

export const TreeFolderSelect = styled.div`
	cursor: pointer;
`;

export const TreeFolderContent = styled.div<{ highlighted: boolean }>`
	${(props) => props.highlighted && `color: ${props.theme.color.errorFg};`}
`;

export const TreeItem = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	margin: 0.1rem;
	padding: 0.5rem;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBgActive};

	&:hover {
		color: ${(props) => props.theme.color.normalFgHover};
		background-color: ${(props) => props.theme.color.normalBgHover};
	}
`;

export const TreeItemContent = styled.div<{ highlighted: boolean }>`
	${(props) => props.highlighted && `color: ${props.theme.color.errorFg};`}
`;

export const TreeItemSelect = styled.div`
	cursor: pointer;
`;
