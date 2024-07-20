import { Text } from "@src/components/text/Text";
import * as S from "./TestTree.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Icon } from "@src/icons/Icon";
import { Input } from "@src/components/input/Input";

const TreeContext = createContext<{
	originalNodes: Node[];
	setOriginalNodes: (nodes: Node[]) => void;
} | null>(null);

const useTreeContext = () => {
	const context = useContext(TreeContext);

	if (!context) {
		throw new Error("useTree must be rendered as a child component");
	}

	return context;
};

type Item = {
	type: "item";
	isSelected: boolean;
	isHighlighted: boolean;
	content: string;
	render: (item: Item) => ReactNode;
};

type Folder = {
	type: "folder";
	isExpanded: boolean;
	isHighlighted: boolean;
	content: string;
	nodes: Node[];
	render: (folder: Folder) => ReactNode;
};

type Node = Item | Folder;

const renderItem: Item["render"] = (item: Item) => {
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

const renderFolder: Folder["render"] = (folder: Folder) => {
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
					{folder.isExpanded ? <Icon iconName="iconChevronUp" /> : <Icon iconName="iconChevronDown" />}
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
			<S.TreeFolderBody>{folder.isExpanded && <Tree nodes={folder.nodes} />}</S.TreeFolderBody>
		</S.TreeFolder>
	);
};

const findNode = (text: string, nodes: Node[], result: Node[] = []): Node[] => {
	nodes.forEach((node) => {
		if (node.content.includes(text)) {
			result.push(node);
		} else if (node.type === "folder") {
			if (node.content === text) {
				result.push(node);
			}

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
		render: renderFolder,
		nodes: [
			{
				type: "folder",
				content: "Folder 0-0",
				isExpanded: true,
				isHighlighted: false,
				render: renderFolder,
				nodes: [
					{
						type: "item",
						content: "item 0-0-0",
						isSelected: false,
						isHighlighted: false,
						render: renderItem,
					},
					{
						type: "item",
						content: "item 0-0-1",
						isSelected: true,
						isHighlighted: false,
						render: renderItem,
					},
					{
						type: "item",
						content: "item 0-0-2",
						isSelected: false,
						isHighlighted: false,
						render: renderItem,
					},
				],
			},
			{
				type: "item",
				content: "item 0-1",
				isSelected: true,
				isHighlighted: false,
				render: renderItem,
			},
		],
	},
	{
		type: "folder",
		isExpanded: true,
		content: "Folder 1",
		isHighlighted: false,
		render: renderFolder,
		nodes: [
			{
				type: "folder",
				content: "Folder 1-0",
				isExpanded: true,
				isHighlighted: false,
				render: renderFolder,
				nodes: [
					{
						type: "item",
						content: "item 1-0-0",
						isSelected: false,
						isHighlighted: false,
						render: renderItem,
					},
					{
						type: "item",
						content: "item 1-0-1",
						isSelected: false,
						isHighlighted: false,
						render: renderItem,
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
		render: renderFolder,
		nodes: [
			{
				type: "item",
				content: "item 2-0",
				isSelected: false,
				isHighlighted: false,
				render: renderItem,
			},
			{
				type: "item",
				content: "item 2-1",
				isSelected: false,
				isHighlighted: false,
				render: renderItem,
			},
		],
	},
];

for (let i = 0; i < 1000; i++) {
	if (data[2].type === "folder") {
		data[2].nodes.push({
			type: "item",
			content: `item 2-${2 + i}`,
			isSelected: false,
			isHighlighted: false,
			render: renderItem,
		});
	}
}

interface Props {
	nodes: Node[];
}

const Tree = ({ nodes }: Props) => {
	return (
		<S.Tree>
			{nodes.map((node, index) => (
				<S.TreeNode key={index}>
					{node.type === "item" && node.render(node)}
					{node.type === "folder" && node.render(node)}
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
						highlightItems(nodesFounded, true, nodes, setNodes);
					}}
				/>

				<Tree nodes={nodes} />
			</S.TestTree>
		</TreeContext.Provider>
	);
};
