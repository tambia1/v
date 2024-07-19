import { Text } from "@src/components/text/Text";
import * as S from "./TestTree.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { ReactNode, useEffect, useState } from "react";
import { Icon } from "@src/icons/Icon";

type Item = {
	type: "item";
	isSelected: boolean;
	content: string;
	render: (item: Item, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => ReactNode;
};

type Folder = {
	type: "folder";
	isExpanded: boolean;
	content: string;
	nodes: Node[];
	render: (folder: Folder, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => ReactNode;
};

type Node = Item | Folder;

const renderItem: Item["render"] = (item: Item, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => {
	return (
		<S.TreeItem
			onClick={() => {
				selectItem(item, !item.isSelected, originalNodes, setOriginalNodes);
			}}
		>
			<S.TreeItemSelect>{item.isSelected ? <Icon iconName="iconCheckSquare" /> : <Icon iconName="iconSquare" />}</S.TreeItemSelect>
			<S.TreeItemContent>{item.content}</S.TreeItemContent>
		</S.TreeItem>
	);
};

const renderFolder: Folder["render"] = (folder: Folder, originalNodes: Node[], setOriginalNodes: (nodes: Node[]) => void) => {
	const isAllSelected = isItemsSeleted(folder.nodes);

	return (
		<S.TreeFolder>
			<S.TreeFolderHeader>
				<S.TreeFolderExpand
					onClick={() => {
						expandItem(folder, !folder.isExpanded, originalNodes, setOriginalNodes);
					}}
				>
					{folder.isExpanded ? <Icon iconName="iconChevronUp" /> : <Icon iconName="iconChevronDown" />}
				</S.TreeFolderExpand>
				<S.TreeFolderSelect
					onClick={() => {
						selectItems(folder.nodes, !isAllSelected, originalNodes, setOriginalNodes);
					}}
				>
					{isAllSelected ? <Icon iconName="iconCheckSquare" /> : <Icon iconName="iconSquare" />}
				</S.TreeFolderSelect>
				<S.TreeFolderContent>{folder.content}</S.TreeFolderContent>
			</S.TreeFolderHeader>
			<S.TreeFolderBody>{folder.isExpanded && <TreeNode nodes={folder.nodes} originalNodes={originalNodes} setOriginalNodes={setOriginalNodes} />}</S.TreeFolderBody>
		</S.TreeFolder>
	);
};

const findNode = (nodeToFind: Node, nodes: Node[]) => {
	nodes.forEach((node) => {
		if (node.content === nodeToFind.content) {
			return node;
		} else if (node.type === "folder") {
			return findNode(nodeToFind, node.nodes);
		}
	});

	return null;
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

const data: Node[] = [
	{
		type: "folder",
		content: "Folder 0",
		isExpanded: true,
		render: renderFolder,
		nodes: [
			{
				type: "folder",
				content: "Folder 0-0",
				isExpanded: true,
				render: renderFolder,
				nodes: [
					{
						type: "item",
						content: "item 0-0-0",
						isSelected: false,
						render: renderItem,
					},
					{
						type: "item",
						content: "item 0-0-1",
						isSelected: true,
						render: renderItem,
					},
					{
						type: "item",
						content: "item 0-0-2",
						isSelected: false,
						render: renderItem,
					},
				],
			},
			{
				type: "item",
				content: "item 0-1",
				isSelected: true,
				render: renderItem,
			},
		],
	},
	{
		type: "folder",
		isExpanded: true,
		content: "Folder 1",
		render: renderFolder,
		nodes: [
			{
				type: "folder",
				content: "Folder 1-0",
				isExpanded: true,
				render: renderFolder,
				nodes: [
					{
						type: "item",
						content: "item 1-0-0",
						isSelected: false,
						render: renderItem,
					},
					{
						type: "item",
						content: "item 1-0-1",
						isSelected: false,
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
		render: renderFolder,
		nodes: [
			{
				type: "item",
				content: "item 2-0",
				isSelected: false,
				render: renderItem,
			},
			{
				type: "item",
				content: "item 2-1",
				isSelected: false,
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
			render: renderItem,
		});
	}
}

interface Props {
	nodes: Node[];
}

const Tree = (props: Props) => {
	const [originalNodes, setOriginalNodes] = useState<Node[]>(props.nodes);

	useEffect(() => {
		setOriginalNodes(data);
	}, [props.nodes]);

	return <TreeNode nodes={originalNodes} originalNodes={originalNodes} setOriginalNodes={setOriginalNodes} />;
};

const TreeNode = ({ nodes, originalNodes, setOriginalNodes }: { nodes: Node[]; originalNodes: Node[]; setOriginalNodes: (nodes: Node[]) => void }) => {
	return (
		<S.Tree>
			{nodes.map((node, index) => (
				<S.TreeNode key={index}>
					{node.type === "item" && node.render(node, originalNodes, setOriginalNodes)}
					{node.type === "folder" && node.render(node, originalNodes, setOriginalNodes)}
				</S.TreeNode>
			))}
		</S.Tree>
	);
};

export const TestTree = () => {
	const [nodes, setNodes] = useState<Node[]>([]);

	useEffect(() => {
		setNodes(data);
	}, []);

	return (
		<S.TestTree>
			<Text size="l">
				<T>{lang.testTree.title}</T>
			</Text>

			<Tree nodes={nodes} />
		</S.TestTree>
	);
};
