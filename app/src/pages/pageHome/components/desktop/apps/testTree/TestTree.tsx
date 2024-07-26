import { Text } from "@src/components/text/Text";
import * as S from "./TestTree.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { createContext, useContext, useEffect, useState } from "react";
import { Icon } from "@src/icons/Icon";
import { Input } from "@src/components/input/Input";

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

type ItemType = {
	type: "item";
	isSelected: boolean;
	isHighlighted: boolean;
	content: string;
};

type FolderType = {
	type: "folder";
	isExpanded: boolean;
	isHighlighted: boolean;
	content: string;
	nodes: Node[];
};

type Node = ItemType | FolderType;

type ItemProps = {
	item: ItemType;
};

const Item = ({ item }: ItemProps) => {
	const treeContext = useTreeContext();

	return (
		<S.TreeItem
			onClick={() => {
				selectItem(item, !item.isSelected, treeContext.originalNodes, treeContext.setOriginalNodes);
			}}
		>
			<S.TreeItemSelect>{item.isSelected ? <Icon iconName="iconCheckSquare" /> : <Icon iconName="iconSquare" />}</S.TreeItemSelect>
			<S.TreeItemContent highlighted={item.isHighlighted}>{item.content}</S.TreeItemContent>
		</S.TreeItem>
	);
};

type FolderProps = {
	folder: FolderType;
	Item: ({ item }: ItemProps) => JSX.Element;
	Folder: ({ folder, Item, Folder }: FolderProps) => JSX.Element;
};

const Folder = ({ folder, Item, Folder }: FolderProps) => {
	const treeContext = useTreeContext();
	const isAllSelected = isItemsSeleted(folder.nodes);

	return (
		<S.TreeFolder>
			<S.TreeFolderHeader>
				<S.TreeFolderExpand
					onClick={() => {
						expandItem(folder, !folder.isExpanded, treeContext.originalNodes, treeContext.setOriginalNodes);
					}}
				>
					{folder.isExpanded ? <Icon iconName="iconChevronRight" /> : <Icon iconName="iconChevronDown" />}
				</S.TreeFolderExpand>
				<S.TreeFolderSelect
					onClick={() => {
						selectItems(folder.nodes, !isAllSelected, treeContext.originalNodes, treeContext.setOriginalNodes);
					}}
				>
					{isAllSelected ? <Icon iconName="iconCheckSquare" /> : <Icon iconName="iconSquare" />}
				</S.TreeFolderSelect>
				<S.TreeFolderContent highlighted={folder.isHighlighted}>{folder.content}</S.TreeFolderContent>
			</S.TreeFolderHeader>
			<S.TreeFolderBody>{folder.isExpanded && <Tree nodes={folder.nodes} Item={Item} Folder={Folder} />}</S.TreeFolderBody>
		</S.TreeFolder>
	);
};

const findNode = (text: string, nodes: Node[], result: Node[] = []): Node[] => {
	nodes.forEach((node) => {
		if (fuzzySearch(text, node.content).length > 0) {
			result.push(node);
		}

		if (node.type === "folder") {
			findNode(text, node.nodes, result);
		}
	});

	return result;
};

const expandItem = (folder: FolderType, isExpanded: boolean, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => {
	folder.isExpanded = isExpanded;
	setOriginalNodes([...originalNodes]);
};

const selectItem = (item: ItemType, isSelected: boolean, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => {
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

const isItemsSeleted = (nodes: Node[]): boolean => {
	for (const node of nodes) {
		if (node.type === "item" && !node.isSelected) {
			return false;
		} else if (node.type === "folder" && !isItemsSeleted(node.nodes)) {
			return false;
		}
	}

	return true;
};

const highlightItems = (nodes: Node[], isHighlighted: boolean, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => {
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

const data: Node[] = [
	{
		type: "folder",
		content: "Folder 0",
		isExpanded: true,
		isHighlighted: false,
		nodes: [
			{
				type: "folder",
				content: "Folder 0-0",
				isExpanded: true,
				isHighlighted: false,
				nodes: [
					{
						type: "item",
						content: "item 0-0-0",
						isSelected: false,
						isHighlighted: false,
					},
					{
						type: "item",
						content: "item 0-0-1",
						isSelected: true,
						isHighlighted: false,
					},
					{
						type: "item",
						content: "item 0-0-2",
						isSelected: false,
						isHighlighted: false,
					},
				],
			},
			{
				type: "item",
				content: "item 0-1",
				isSelected: true,
				isHighlighted: false,
			},
		],
	},
	{
		type: "folder",
		isExpanded: true,
		content: "Folder 1",
		isHighlighted: false,
		nodes: [
			{
				type: "folder",
				content: "Folder 1-0",
				isExpanded: true,
				isHighlighted: false,
				nodes: [
					{
						type: "item",
						content: "item 1-0-0",
						isSelected: false,
						isHighlighted: false,
					},
					{
						type: "item",
						content: "item 1-0-1",
						isSelected: false,
						isHighlighted: false,
					},
				],
			},
		],
	},
	{
		type: "folder",
		isExpanded: false,
		content: "Folder 2",
		isHighlighted: false,
		nodes: [],
	},
	{
		type: "folder",
		isExpanded: true,
		content: "Folder 3",
		isHighlighted: false,
		nodes: [
			{
				type: "folder",
				content: "Folder 3-0",
				isExpanded: false,
				isHighlighted: false,
				nodes: [],
			},
		],
	},
];

for (let i = 0; i < 1000; i++) {
	if (data[2].type === "folder") {
		data[2].nodes.push({
			type: "item",
			content: `item 2-${i}`,
			isSelected: false,
			isHighlighted: false,
		});
	}
}

for (let i = 0; i < 1000; i++) {
	if (data[3].type === "folder") {
		if (data[3].nodes[0].type === "folder") {
			data[3].nodes[0].nodes.push({
				type: "item",
				content: `item 3-${i}`,
				isSelected: false,
				isHighlighted: false,
			});
		}
	}
}

const fuzzySearch = (textToSearch: string, textToSearchInto: string) => {
	const matches = [];

	for (let i = 0, j = 0; i < textToSearch.length; i++) {
		for (; j < textToSearchInto.length; j++) {
			if (textToSearch[i].toLowerCase() == textToSearchInto[j].toLowerCase()) {
				matches.push(j);
				j++;

				break;
			}
		}
	}

	const result = matches.length == textToSearch.length ? matches : [];

	return result;
};

interface Props {
	nodes: Node[];
	Item: ({ item }: ItemProps) => JSX.Element;
	Folder: ({ folder, Item, Folder }: FolderProps) => JSX.Element;
}

const Tree = ({ nodes, Item, Folder }: Props) => {
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

export const TestTree = () => {
	const [nodes, setNodes] = useState<Node[]>([]);
	const [title, setTitle] = useState("");

	useEffect(() => {
		setNodes(data);
	}, []);

	return (
		<TreeContext.Provider value={{ originalNodes: nodes, setOriginalNodes: setNodes }}>
			<S.TestTree>
				<Text size="l">
					<T>{lang.testTree.title}</T>
				</Text>

				<Input
					value={title}
					onTextChange={(value: string) => {
						setTitle(value);

						highlightItems(nodes, false, nodes, setNodes);

						const nodesFounded = findNode(value, nodes);
						nodesFounded.forEach((node) => {
							node.isHighlighted = true;
						});

						setNodes([...nodes]);
					}}
				/>

				<Tree nodes={nodes} Item={Item} Folder={Folder} />
			</S.TestTree>
		</TreeContext.Provider>
	);
};
