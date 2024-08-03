import { Text } from "@src/components/text/Text";
import * as S from "./TestTree.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { createContext, useContext, useEffect, useState } from "react";
import { Icon } from "@src/icons/Icon";
import { Input } from "@src/components/input/Input";
import { useDebounce } from "@src/hooks/UseDebounce";

const TreeContext = createContext<{
	originalFolder: FolderType;
	setOriginalFolder: (folder: FolderType) => void;
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
		<S.TreeItem>
			<S.TreeItemSelect
				onClick={() => {
					selectItem(item, !item.isSelected, treeContext);
				}}
			>
				{item.isSelected ? <Icon iconName="iconCheckSquare" /> : <Icon iconName="iconSquare" />}
			</S.TreeItemSelect>
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
		<S.Tree>
			<S.TreeFolder>
				<S.TreeFolderHeader>
					<S.TreeFolderExpand
						onClick={() => {
							expandItem(folder, !folder.isExpanded, treeContext);
						}}
					>
						{folder.isExpanded ? <Icon iconName="iconChevronRight" /> : <Icon iconName="iconChevronDown" />}
					</S.TreeFolderExpand>
					<S.TreeFolderSelect
						onClick={() => {
							selectItems(folder.nodes, !isAllSelected, treeContext);
						}}
					>
						{isAllSelected ? <Icon iconName="iconCheckSquare" /> : <Icon iconName="iconSquare" />}
					</S.TreeFolderSelect>
					<S.TreeFolderContent highlighted={folder.isHighlighted}>{folder.content}</S.TreeFolderContent>
				</S.TreeFolderHeader>
				<S.TreeFolderBody>
					{folder.isExpanded && (
						<S.Tree>
							{folder.nodes.map((node, index) => (
								<S.TreeNode key={index}>
									{node.type === "item" && <Item item={node} />}
									{node.type === "folder" && <Folder folder={node} Item={Item} Folder={Folder} />}
								</S.TreeNode>
							))}
						</S.Tree>
					)}
				</S.TreeFolderBody>
			</S.TreeFolder>
		</S.Tree>
	);
};

const expandItem = (folder: FolderType, isExpanded: boolean, treeContext: { originalFolder: FolderType; setOriginalFolder: (folder: FolderType) => void }) => {
	folder.isExpanded = isExpanded;
	treeContext.setOriginalFolder({ ...treeContext.originalFolder });
};

const selectItem = (item: ItemType, isSelected: boolean, treeContext: { originalFolder: FolderType; setOriginalFolder: (folder: FolderType) => void }) => {
	item.isSelected = isSelected;

	treeContext.setOriginalFolder({ ...treeContext.originalFolder });
};

const selectItems = (nodes: Node[], isSelected: boolean, treeContext: { originalFolder: FolderType; setOriginalFolder: (folder: FolderType) => void }) => {
	nodes.forEach((node) => {
		if (node.type === "item") {
			node.isSelected = isSelected;
		} else {
			selectItems(node.nodes, isSelected, treeContext);
		}
	});

	treeContext.setOriginalFolder({ ...treeContext.originalFolder });
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

const highlightItems = (folder: FolderType, isHighlighted: boolean, originalFolder: FolderType, setOriginalFolder: (folder: FolderType) => void) => {
	folder.nodes.forEach((node) => {
		if (node.type === "item") {
			node.isHighlighted = isHighlighted;
		} else {
			node.isHighlighted = isHighlighted;
			highlightItems(node, isHighlighted, originalFolder, setOriginalFolder);
		}
	});

	setOriginalFolder({ ...originalFolder });
};

const findNode = (text: string, folder: FolderType, result: Node[] = []): Node[] => {
	folder.nodes.forEach((node) => {
		if (fuzzySearch(text, node.content).length > 0) {
			result.push(node);
		}

		if (node.type === "folder") {
			findNode(text, node, result);
		}
	});

	return result;
};

const folderData: FolderType = {
	type: "folder",
	content: "Root",
	isExpanded: true,
	isHighlighted: false,
	nodes: [
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
					nodes: [
						{
							type: "item",
							content: "item 3-0-1",
							isSelected: false,
							isHighlighted: false,
						},
					],
				},
			],
		},
	],
};

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

export const TestTree = () => {
	const [folder, setFolder] = useState<FolderType>(folderData);
	const [title, setTitle] = useState("");
	const debouncedTitle = useDebounce(title, 500);

	useEffect(() => {
		setFolder(folderData);
	}, []);

	useEffect(() => {
		highlightItems(folder, false, folder, setFolder);

		const nodesFounded = findNode(debouncedTitle, folder);
		nodesFounded.forEach((node) => {
			node.isHighlighted = true;
		});

		setFolder({ ...folder });
	}, [debouncedTitle]);

	return (
		<TreeContext.Provider value={{ originalFolder: folder, setOriginalFolder: setFolder }}>
			<S.TestTree>
				<Text size="l">
					<T>{lang.testTree.title}</T>
				</Text>

				<Input
					value={title}
					onTextChange={(value: string) => {
						setTitle(value);
					}}
				/>

				<Folder folder={folder} Item={Item} Folder={Folder} />
			</S.TestTree>
		</TreeContext.Provider>
	);
};
