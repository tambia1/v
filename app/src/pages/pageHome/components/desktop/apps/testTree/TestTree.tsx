import { Text } from "@src/components/text/Text";
import * as S from "./TestTree.styles";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useEffect, useState } from "react";
import { Input } from "@src/components/input/Input";
import { useDebounce } from "@src/hooks/UseDebounce";
import { findNode, highlightItems, NodeType, Tree } from "@src/components/tree/Tree";

const data: NodeType[] = [
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

export const TestTree = () => {
	const [nodes, setNodes] = useState<NodeType[]>(data);
	const [title, setTitle] = useState("");
	const debouncedTitle = useDebounce(title, 500);

	useEffect(() => {
		if (nodes.length === 0) {
			return;
		}

		highlightItems(nodes, false, nodes, setNodes);

		const nodesFounded = findNode(debouncedTitle, nodes);
		nodesFounded.forEach((node) => {
			node.isHighlighted = true;
		});

		setNodes([...nodes]);
	}, [debouncedTitle]);

	return (
		<S.TestTree>
			<Text size="l">
				<T>{lang.testTree.title}</T>
			</Text>

			<S.InputContainer>
				<Input
					value={title}
					onTextChange={(value: string) => {
						setTitle(value);
					}}
				/>
			</S.InputContainer>

			<S.TreeContainer>
				<Tree nodes={nodes} setNodes={setNodes} />
			</S.TreeContainer>
		</S.TestTree>
	);
};
