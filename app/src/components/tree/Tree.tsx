import * as S from "./Tree.styles";
import { createContext, ReactNode, useContext } from "react";
import { Icon } from "@src/icons/Icon";
import { Search } from "@src/utils/Search";

const TreeContext = createContext<{
	originalNodes: NodeType[];
	setOriginalNodes: (nodes: NodeType[]) => void;
} | null>(null);

const useTreeContext = () => {
	const context = useContext(TreeContext);

	if (!context) {
		throw new Error("useTreeContext must be rendered as a child component");
	}

	return context;
};

export type ItemType = {
	type: "item";
	isSelected: boolean;
	isHighlighted: boolean;
	content: string;
};

export type FolderType = {
	type: "folder";
	isExpanded: boolean;
	isHighlighted: boolean;
	content: string;
	nodes: NodeType[];
};

export type NodeType = ItemType | FolderType;

type ItemProps = {
	item: ItemType;
};

export const ItemDefault = ({ item }: ItemProps) => {
	const treeContext = useTreeContext();

	return (
		<S.TreeItem
			onClick={() => {
				selectItem(item, !item.isSelected, treeContext.originalNodes, treeContext.setOriginalNodes);
			}}
		>
			<S.TreeItemSelect>{item.isSelected ? <S.IconFolder iconName="iconCheckSquare" /> : <S.IconFolder iconName="iconSquare" />}</S.TreeItemSelect>
			<S.TreeItemContent highlighted={item.isHighlighted}>{item.content}</S.TreeItemContent>
		</S.TreeItem>
	);
};

type FolderProps = {
	folder: FolderType;
	Item: ({ item }: ItemProps) => ReactNode;
	Folder: ({ folder, Item, Folder }: FolderProps) => ReactNode;
};

export const FolderDefault = ({ folder, Item, Folder }: FolderProps) => {
	const treeContext = useTreeContext();
	const itemsSelectionState = getItemsSelectionState(folder.nodes);

	return (
		<S.TreeFolder>
			<S.TreeFolderHeader
				onClick={() => {
					expandItem(folder, !folder.isExpanded, treeContext.originalNodes, treeContext.setOriginalNodes);
				}}
			>
				<S.TreeFolderSelect
					onClick={() => {
						selectItems(folder.nodes, itemsSelectionState !== "none", treeContext.originalNodes, treeContext.setOriginalNodes);
					}}
				>
					{itemsSelectionState === "none" && <S.IconFolder iconName="iconSquare" />}
					{itemsSelectionState === "partial" && <S.IconFolder iconName="iconMinusSquare" />}
					{itemsSelectionState === "all" && <S.IconFolder iconName="iconCheckSquare" />}
				</S.TreeFolderSelect>
				<S.TreeFolderExpand>{folder.isExpanded ? <Icon iconName="iconChevronRight" /> : <Icon iconName="iconChevronDown" />}</S.TreeFolderExpand>
				<S.TreeFolderContent highlighted={folder.isHighlighted}>{folder.content}</S.TreeFolderContent>
			</S.TreeFolderHeader>
			<S.TreeFolderBody>{folder.isExpanded && <Nodes nodes={folder.nodes} Item={Item} Folder={Folder} />}</S.TreeFolderBody>
		</S.TreeFolder>
	);
};

export const findNode = (text: string, nodes: NodeType[], result: NodeType[] = []): NodeType[] => {
	nodes.forEach((node) => {
		if (Search.fuzzySearch(text, node.content).length > 0) {
			result.push(node);
		}

		if (node.type === "folder") {
			findNode(text, node.nodes, result);
		}
	});

	return result;
};

const expandItem = (folder: FolderType, isExpanded: boolean, originalNodes: NodeType[], setOriginalNodes: (nodes: NodeType[]) => void) => {
	folder.isExpanded = isExpanded;
	setOriginalNodes([...originalNodes]);
};

const selectItem = (item: ItemType, isSelected: boolean, originalNodes: NodeType[], setOriginalNodes: (nodes: NodeType[]) => void) => {
	item.isSelected = isSelected;
	setOriginalNodes([...originalNodes]);
};

const selectItems = (nodes: NodeType[], isSelected: boolean, originalNodes: NodeType[], setOriginalNodes: (nodes: NodeType[]) => void) => {
	nodes.forEach((node) => {
		if (node.type === "item") {
			node.isSelected = isSelected;
		} else {
			selectItems(node.nodes, isSelected, originalNodes, setOriginalNodes);
		}
	});

	setOriginalNodes([...originalNodes]);
};

type ItemSelectionState = "none" | "partial" | "all";

const getItemsSelectionState = (nodes: NodeType[]): ItemSelectionState => {
	let hasSelected = false;
	let hasUnselected = false;

	for (const node of nodes) {
		if (node.type === "item") {
			if (node.isSelected) {
				hasSelected = true;
			} else {
				hasUnselected = true;
			}
		} else if (node.type === "folder") {
			const folderState = getItemsSelectionState(node.nodes);
			if (folderState === "partial") {
				return "partial";
			} else if (folderState === "all") {
				hasSelected = true;
			} else {
				hasUnselected = true;
			}
		}

		if (hasSelected && hasUnselected) {
			return "partial";
		}
	}

	if (hasSelected) {
		return "all";
	} else {
		return "none";
	}
};

export const highlightItems = (nodes: NodeType[], isHighlighted: boolean, originalNodes: NodeType[], setOriginalNodes: (nodes: NodeType[]) => void) => {
	nodes.forEach((node) => {
		if (node.type === "item") {
			node.isHighlighted = isHighlighted;
		} else {
			node.isHighlighted = isHighlighted;
			highlightItems(node.nodes, isHighlighted, originalNodes, setOriginalNodes);
		}
	});

	setOriginalNodes([...originalNodes]);
};

const Nodes = ({ nodes, Item, Folder }: { nodes: NodeType[]; Item: ({ item }: ItemProps) => ReactNode; Folder: ({ folder, Item, Folder }: FolderProps) => ReactNode }) => {
	return (
		<S.Tree>
			{nodes.map((node, index) => (
				<S.TreeNode key={index}>
					{node.type === "item" && <Item item={node} />}
					{node.type === "folder" && <Folder folder={node} Item={Item} Folder={Folder} />}
				</S.TreeNode>
			))}
		</S.Tree>
	);
};

interface Props {
	nodes: NodeType[];
	setNodes: (nodes: NodeType[]) => void;
	Item?: ({ item }: ItemProps) => ReactNode;
	Folder?: ({ folder, Item, Folder }: FolderProps) => ReactNode;
}

export const Tree = ({ nodes, setNodes, Item = ItemDefault, Folder = FolderDefault }: Props) => {
	return (
		<S.Tree>
			<TreeContext.Provider value={{ originalNodes: nodes, setOriginalNodes: setNodes }}>
				<Nodes nodes={nodes} Item={Item} Folder={Folder} />
			</TreeContext.Provider>
		</S.Tree>
	);
};
