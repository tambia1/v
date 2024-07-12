import styled from "styled-components";

export const TestTreeView = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;

	padding: 1rem;
	box-sizing: border-box;

	background-color: ${(props) => props.theme.color.normalBgSelected};
`;

export const Tree = styled.div`
	display: flex;
	flex-direction: column;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};
`;

export const TreeFolder = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;

	color: ${(props) => props.theme.color.accentFg};
	background-color: ${(props) => props.theme.color.accentBg};

	&:hover {
		color: ${(props) => props.theme.color.accentFgHover};
		background-color: ${(props) => props.theme.color.accentBgHover};
	}
`;

export const TreeFolderContent = styled.div``;

export const TreeFolderIcon = styled.div``;

export const TreeItem = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;

	color: ${(props) => props.theme.color.normalFg};
	background-color: ${(props) => props.theme.color.normalBg};

	&:hover {
		color: ${(props) => props.theme.color.normalFgHover};
		background-color: ${(props) => props.theme.color.normalBgHover};
	}
`;

export const TreeItemContent = styled.div``;

export const TreeItemIcon = styled.div``;
