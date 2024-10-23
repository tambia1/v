import { List } from "@src/components/list/List";
import type { HTMLAttributes, ReactNode } from "react";
import { useContextSelect } from "../../context/UseContextSelect";
import * as S from "./Options.styles";
import { Item } from "./components/item/Item";

export type Props = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode[];
};

export const Options = ({ children }: Props) => {
	const contextSelect = useContextSelect();

	return (
		<S.Options $isOpen={contextSelect.isOpen}>
			<List>
				{children.map((item, index) => (
					<List.Cell
						key={index}
						onClick={() => {
							contextSelect.onClickOption(index);
						}}
						$lineState="long"
					>
						<List.Cell.Text>{item}</List.Cell.Text>
					</List.Cell>
				))}
			</List>
		</S.Options>
	);
};

Options.Item = Item;
