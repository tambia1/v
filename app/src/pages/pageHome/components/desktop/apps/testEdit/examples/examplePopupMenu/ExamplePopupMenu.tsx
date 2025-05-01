import { IconButton } from "@src/components/iconButton/IconButton";
import { PopupMenu } from "@src/components/popupMenu/PopupMenu";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

export const ExamplePopupMenu = () => {
	const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);
	const [popupMenuSelectedItem, setPopupMenuSelectedItem] = useState("item_0");

	const handleOnClickPopupMenu = () => {
		setIsPopupMenuOpen(!isPopupMenuOpen);
	};

	const handleOnClickPopupMenuItem = (_index: number, value: string) => {
		setPopupMenuSelectedItem(value);
		setIsPopupMenuOpen(false);
	};

	return (
		<S.Col>
			<S.Title>Popup Menu</S.Title>

			<IconButton iconName="iconMoreVertical" onClick={handleOnClickPopupMenu} />

			<PopupMenu isOpen={isPopupMenuOpen} checkedItem={popupMenuSelectedItem} onClickItem={handleOnClickPopupMenuItem} onClickOutside={handleOnClickPopupMenu}>
				<PopupMenu.Item value="item_a">Item A</PopupMenu.Item>
				<PopupMenu.Item value="item_b">Item B</PopupMenu.Item>
				<PopupMenu.Item value="item_c">Item C</PopupMenu.Item>
			</PopupMenu>
		</S.Col>
	);
};
