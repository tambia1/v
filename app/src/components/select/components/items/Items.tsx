import { List } from "@src/components/list/List";
import type { HTMLAttributes, ReactNode } from "react";
import { useContextSelect } from "../../context/UseContextSelect";
import * as S from "./Items.styles";
import { Item } from "./components/item/Item";

export type Props = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode[];
};

export const Items = ({ children }: Props) => {
	const contextSelect = useContextSelect();

	return (
		<S.Items $isOpen={contextSelect.isOpen} $width={contextSelect.width}>
			<List>
				{children.map((item, index) => (
					<List.Cell
						key={index}
						onClick={(e) => {
							contextSelect.onClickItem(e, index, item);
						}}
						$lineState="long"
					>
						{item}
					</List.Cell>
				))}
			</List>
		</S.Items>
	);
};

Items.Item = Item;
