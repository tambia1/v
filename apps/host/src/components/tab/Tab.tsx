import type { ReactElement } from "react";

import { Button } from "../button/Button";
import { Item } from "./components/item/Item";
import { Root } from "./components/root/Root";

export type Props = {
	className?: string;
	children: ReactElement<{ value: string }>[];
	onClickItem: (index: number, value: string) => void;
	selectedTabIndex: number;
};

export const Tab = ({ children, className, selectedTabIndex, onClickItem, ...rest }: Props) => {
	const handleClickItem = (index: number, item: ReactElement<{ value: string }>) => {
		const value = item.props.value;
		onClickItem(index, value);
	};

	return (
		<Tab.Root className={className} {...rest}>
			{children.map((item, index) => (
				<Button key={index} variant={selectedTabIndex === index ? "styled" : "text"} onClick={() => handleClickItem(index, item)}>
					{item}
				</Button>
			))}
		</Tab.Root>
	);
};

Tab.Root = Root;
Tab.Item = Item;
