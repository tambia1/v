import { type HTMLAttributes, type ReactElement, useEffect } from "react";
import { Icon } from "../icon/Icon";
import { List } from "../list/List";
import { Item } from "./components/item/Item";
import * as S from "./PopupMenu.styles";

export type Props = HTMLAttributes<HTMLDivElement> & {
	className?: string;
	children: ReactElement<{ value: string }>[];
	isOpen: boolean;
	checkedItem: string;
	onClickItem: (index: number, value: string) => void;
	onClickOutside: () => void;
};

export const PopupMenu = ({ className, children, isOpen, checkedItem, onClickItem, onClickOutside, ...rest }: Props) => {
	useEffect(() => {
		const handleOnClickOutside = () => {
			if (isOpen) {
				setTimeout(() => {
					if (isOpen) {
						onClickOutside();
					}
				}, 10);
			}
		};

		document.addEventListener("mouseup", handleOnClickOutside);

		return () => {
			document.removeEventListener("mouseup", handleOnClickOutside);
		};
	}, [onClickOutside, isOpen]);

	const handleClickItem = (index: number, item: ReactElement<{ value: string }>) => {
		const value = item.props.value;
		onClickItem(index, value);
	};

	return (
		<S.PopupMenu>
			<S.Items $isOpen={isOpen} {...rest}>
				<List>
					{children.map((item, index) => (
						<List.Cell key={index} $lineState="long" onClick={() => handleClickItem(index, item)}>
							<List.Cell.Text>{item}</List.Cell.Text>
							<List.Cell.Image>
								<Icon iconName={item.props.value === checkedItem ? "iconCheck" : ""} />
							</List.Cell.Image>
						</List.Cell>
					))}
				</List>
			</S.Items>
		</S.PopupMenu>
	);
};

PopupMenu.Item = Item;
