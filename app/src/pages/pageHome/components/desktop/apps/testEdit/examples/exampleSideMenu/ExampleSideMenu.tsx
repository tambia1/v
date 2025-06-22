import { IconButton } from "@src/components/iconButton/IconButton";
import { type MenuGroup, SideMenu } from "@src/components/sideMenu/SideMenu";
import { Text } from "@src/components/text/Text";
import { useState } from "react";
import * as S from "../../TestEdit.styles";

type MenuItemId = "create" | "edit" | "delete" | "settings" | "help";

const menuGroups: MenuGroup<MenuItemId>[] = [
	{
		content: "Actions",
		menuItems: [
			{ id: "create", content: "Create New" },
			{ id: "edit", content: "Edit Item" },
			{ id: "delete", content: "Delete Item" },
		],
	},
	{
		content: "Options",
		menuItems: [
			{ id: "settings", content: "Settings" },
			{ id: "help", content: "Help" },
		],
	},
];

export const ExampleSideMenu = () => {
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [selectedMenuId, setSelectedMenuId] = useState<MenuItemId>("create");

	const handleOnClickMenuBackground = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	const handleOnClickMenuItem = (id: MenuItemId) => {
		setSelectedMenuId(id);
		setIsMenuVisible(false);
	};

	return (
		<S.Col>
			<S.Title>Side Menu</S.Title>

			<S.Row>
				<IconButton iconName="iconMenu" onClick={handleOnClickMenuBackground} />
			</S.Row>

			<SideMenu
				$visible={isMenuVisible}
				menuGroups={menuGroups}
				selectedMenuId={selectedMenuId}
				onClickBackground={handleOnClickMenuBackground}
				onClickItem={handleOnClickMenuItem}
			>
				<S.Col style={{ padding: "0rem", height: "15rem" }}>
					<Text variant="body">Side Menu Content</Text>
					<Text variant="body">
						This is the main content area. The side menu slides in from the left
						when you click the menu button.
					</Text>
					<Text variant="body">
						Selected menu item: &nbsp;
						<Text variant="body" color="info600">
							{selectedMenuId}
						</Text>
					</Text>
				</S.Col>
			</SideMenu>
		</S.Col>
	);
};
