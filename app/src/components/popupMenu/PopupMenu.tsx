import { type HTMLAttributes, type ReactNode, useEffect } from "react";
import { Icon } from "../icon/Icon";
import { List } from "../list/List";
import * as S from "./PopupMenu.styles";
import { Item } from "./components/item/Item";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactNode[];
	isOpen: boolean;
	checkedItemIndex: number;
	onClickItem: (index: number) => void;
	onClickOutside: () => void;
};

export const PopupMenu = ({ className, children, isOpen, checkedItemIndex, onClickItem, onClickOutside, ...rest }: Props) => {
	useEffect(() => {
		const handleOnClickOutside = () => {
			if (isOpen) {
				onClickOutside();
			}
		};

		document.addEventListener("mouseup", handleOnClickOutside);

		return () => {
			document.removeEventListener("mouseup", handleOnClickOutside);
		};
	}, [onClickOutside, isOpen]);

	const handleClickItem = (event: React.MouseEvent, index: number) => {
		event.stopPropagation();
		onClickItem(index);
	};

	return (
		<S.PopupMenu>
			<S.Items $isOpen={isOpen} {...rest}>
				<List>
					{children.map((item, index) => (
						<List.Cell key={index} $lineState="long" onClick={(e) => handleClickItem(e, index)}>
							<List.Cell.Text>{item}</List.Cell.Text>
							<List.Cell.Image>
								<Icon iconName={index === checkedItemIndex ? "iconCheck" : ""} />
							</List.Cell.Image>
						</List.Cell>
					))}
				</List>
			</S.Items>
		</S.PopupMenu>
	);
};

PopupMenu.Item = Item;
