import * as S from "./Redis.styles";
import { Menu, MenuGroup } from "@src/components/menu/Menu";
import { Navigator } from "@src/components/navigator/Navigator";
import { useState } from "react";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Datacenter } from "./components/datacenter/Datacenter";

export const Redis = () => {
	const [isMenuVisible, setIsMenuVisible] = useState(false);

	const menuGroups: MenuGroup[] = [
		{
			text: "Data",
			menuItems: [
				{ id: "datacenter", text: <T>{lang.redis.menu.datacenter}</T>, onClick: () => {} },
				{ id: "about1", text: "Data Access Controll", onClick: () => {} },
				{ id: "about2", text: "Access Management", onClick: () => {} },
				{ id: "about3", text: "Logs", onClick: () => {} },
			],
		},
		{
			text: "Settings",
			menuItems: [
				{ id: "about4", text: "Account Settings", onClick: () => {} },
				{ id: "about5", text: "Usage Report", onClick: () => {} },
				{ id: "about6", text: "Billing & Payments", onClick: () => {} },
			],
		},
		{
			text: "About",
			menuItems: [
				{ id: "about7", text: "Support", onClick: () => {} },
				{ id: "about8", text: "About", onClick: () => {} },
			],
		},
	];

	const handleOnClickMenu = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	return (
		<S.Redis>
			<S.MenuIcon iconName="iconMenu" onClick={handleOnClickMenu} />

			<Menu visible={isMenuVisible} menuGroups={menuGroups} onClickBackground={handleOnClickMenu}>
				<Navigator>
					<Navigator.Page id="app" title={<T>{lang.redis.menu.datacenter}</T>}>
						<Datacenter />
					</Navigator.Page>
				</Navigator>
			</Menu>
		</S.Redis>
	);
};
