import { Text } from "@src/components/text/Text";
import * as S from "./TestTree.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { ReactNode, useState } from "react";
import { Icon } from "@src/icons/Icon";

type Folder = {
	type: "folder";
	isExpanded: boolean;
	content: string;
	data: Node[];
	render: (props: Folder) => ReactNode;
};

type Item = {
	type: "item";
	isSelected: boolean;
	content: string;
	render: (props: Item) => ReactNode;
};

type Node = Folder | Item;

const renderFolder = (props: Folder) => {
	const [_, setState] = useState(props.isExpanded);
	const isAllSelected = false;

	return (
		<S.TreeFolder
			onClick={() => {
				props.isExpanded = !props.isExpanded;
				setState(props.isExpanded);
			}}
		>
			{isAllSelected ? <Icon iconName="iconCheckSquare" /> : <Icon iconName="iconSquare" />}
			{props.isExpanded ? <Icon iconName="iconChevronUp" /> : <Icon iconName="iconChevronDown" />}
			<S.TreeFolderContent>{props.content}</S.TreeFolderContent>
		</S.TreeFolder>
	);
};

const renderItem = (props: Item) => {
	const [_, setState] = useState(props.isSelected);

	return (
		<S.TreeItem
			onClick={() => {
				props.isSelected = !props.isSelected;
				setState(props.isSelected);
			}}
		>
			{props.isSelected ? <Icon iconName="iconCheckSquare" /> : <Icon iconName="iconSquare" />}
			<S.TreeItemContent>{props.content}</S.TreeItemContent>
		</S.TreeItem>
	);
};

const nodes: Node[] = [
	{
		type: "folder",
		content: "Folder 0",
		isExpanded: true,
		render: renderFolder,
		data: [
			{
				type: "folder",
				content: "Folder 0-0",
				isExpanded: true,
				render: renderFolder,
				data: [
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
		data: [
			{
				type: "folder",
				content: "Folder 1-0",
				isExpanded: true,
				render: renderFolder,
				data: [
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
		data: [
			{
				type: "folder",
				content: "Folder 2-0",
				isExpanded: true,
				render: renderFolder,
				data: [
					{
						type: "item",
						content: "item 2-0-0",
						isSelected: false,
						render: renderItem,
					},
					{
						type: "item",
						content: "item 2-0-1",
						isSelected: false,
						render: renderItem,
					},
				],
			},
		],
	},
];

interface Props {
	nodes: Node[];
}

const Tree = ({ nodes }: Props) => {
	return (
		<S.Tree>
			{nodes.map((node, index) => (
				<div key={index}>{node.type === "folder" ? <TreeFolder node={node} /> : <TreeItem node={node} />}</div>
			))}
		</S.Tree>
	);
};

const TreeFolder = ({ node }: { node: Folder }) => {
	return (
		<div>
			<div>{node.render(node)}</div>

			{node.isExpanded && (
				<div style={{ paddingLeft: 20 }}>
					<Tree nodes={node.data} />
				</div>
			)}
		</div>
	);
};

const TreeItem = ({ node }: { node: Item }) => {
	return <div style={{ paddingLeft: 0 }}>{node.render(node)}</div>;
};

export const TestTree = () => {
	return (
		<S.TestTreeView>
			<Text size="l">
				<T>{lang.testTree.title}</T>
			</Text>

			<Tree nodes={nodes} />
		</S.TestTreeView>
	);
};
