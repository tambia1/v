import { Icon } from "@src/components/icon/Icon";
import { Search } from "@src/utils/Search";
import { createContext, type ReactNode, useContext } from "react";
import * as S from "./Tree.styles";

const TreeContext = createContext<{
	originalNodes: Node[];
	setOriginalNodes: (nodes: Node[]) => void;
} | null>(null);

const useTreeContext = () => {
	const context = useContext(TreeContext);

	if (!context) {
		throw new Error("useTreeContext must be rendered as a child component");
	}

	return context;
};

export type Item = {
	type: "item";
	isSelected: boolean;
	isHighlighted: boolean;
	content: string;
};

export type Folder = {
	type: "folder";
	isExpanded: boolean;
	isHighlighted: boolean;
	content: string;
	nodes: Node[];
};

export type Node = Item | Folder;

type ItemProps = {
	item: Item;
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
	folder: Folder;
	Item: ({ item }: ItemProps) => ReactNode;
	Folder: ({ folder, Item, Folder }: FolderProps) => ReactNode;
};

export const FolderDefault = ({ folder, Item, Folder }: FolderProps) => {
	const treeContext = useTreeContext();
	const itemsSelectionState = getItemsSelectionState(folder.nodes);

	return (
		<S.TreeFolder>
			<S.TreeFolderHeader>
				<S.TreeFolderSelect
					onClick={() => {
						selectItems(folder.nodes, itemsSelectionState === "none", treeContext.originalNodes, treeContext.setOriginalNodes);
					}}
				>
					{itemsSelectionState === "none" && <S.IconFolder iconName="iconSquare" />}
					{itemsSelectionState === "partial" && <S.IconFolder iconName="iconMinusSquare" />}
					{itemsSelectionState === "all" && <S.IconFolder iconName="iconCheckSquare" />}
				</S.TreeFolderSelect>
				<S.TreeFolderExpand>{folder.isExpanded ? <Icon iconName="iconChevronRight" /> : <Icon iconName="iconChevronDown" />}</S.TreeFolderExpand>
				<S.TreeFolderContent
					$highlighted={folder.isHighlighted}
					onClick={() => {
						expandItem(folder, !folder.isExpanded, treeContext.originalNodes, treeContext.setOriginalNodes);
					}}
				>
					{folder.content}
				</S.TreeFolderContent>
			</S.TreeFolderHeader>
			<S.TreeFolderBody>{folder.isExpanded && <Nodes nodes={folder.nodes} Item={Item} Folder={Folder} />}</S.TreeFolderBody>
		</S.TreeFolder>
	);
};

export const findNode = (text: string, nodes: Node[], result: Node[] = []): Node[] => {
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

const expandItem = (folder: Folder, isExpanded: boolean, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => {
	folder.isExpanded = isExpanded;
	setOriginalNodes([...originalNodes]);
};

const selectItem = (item: Item, isSelected: boolean, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => {
	item.isSelected = isSelected;
	setOriginalNodes([...originalNodes]);
};

const selectItems = (nodes: Node[], isSelected: boolean, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => {
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

const getItemsSelectionState = (nodes: Node[]): ItemSelectionState => {
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
			}

			if (folderState === "all") {
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
	}

	return "none";
};

export const highlightItems = (nodes: Node[], isHighlighted: boolean, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => {
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

const Nodes = ({
	nodes,
	Item,
	Folder,
}: {
	nodes: Node[];
	Item: ({ item }: ItemProps) => ReactNode;
	Folder: ({ folder, Item, Folder }: FolderProps) => ReactNode;
}) => {
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

type Props = {
	nodes: Node[];
	setNodes: (nodes: Node[]) => void;
	Item?: ({ item }: ItemProps) => ReactNode;
	Folder?: ({ folder, Item, Folder }: FolderProps) => ReactNode;
};

export const Tree = ({ nodes, setNodes, Item = ItemDefault, Folder = FolderDefault }: Props) => {
	return (
		<S.Tree>
			<TreeContext value={{ originalNodes: nodes, setOriginalNodes: setNodes }}>
				<Nodes nodes={nodes} Item={Item} Folder={Folder} />
			</TreeContext>
		</S.Tree>
	);
};
