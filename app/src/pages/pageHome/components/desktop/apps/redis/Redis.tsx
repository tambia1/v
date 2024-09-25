import * as S from "./Redis.styles";
import { Menu, MenuGroup } from "@src/components/menu/Menu";
import { Navigator } from "@src/components/navigator/Navigator";
import { useEffect, useState } from "react";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Home } from "./components/home/Home";
import { Datacenter } from "./components/datacenter/Datacenter";
import { StoreUser } from "./components/user/stores/StoreUser";
import { User } from "./components/user/User";

type MenuItemId = "dataCenter" | "dataAccess" | "settings" | "reports" | "payments" | "support" | "about";

const menuGroups: MenuGroup<MenuItemId>[] = [
	{
		text: <T>{lang.redis.menu.data.title}</T>,
		menuItems: [
			{ id: "dataCenter", text: <T>{lang.redis.menu.data.dataCenter}</T> },
			{ id: "dataAccess", text: <T>{lang.redis.menu.data.dataAccess}</T> },
		],
	},
	{
		text: <T>{lang.redis.menu.settings.title}</T>,
		menuItems: [
			{ id: "settings", text: <T>{lang.redis.menu.settings.settings}</T> },
			{ id: "reports", text: <T>{lang.redis.menu.settings.reports}</T> },
			{ id: "payments", text: <T>{lang.redis.menu.settings.payments}</T> },
		],
	},
	{
		text: <T>{lang.redis.menu.about.title}</T>,
		menuItems: [
			{ id: "support", text: <T>{lang.redis.menu.about.support}</T> },
			{ id: "about", text: <T>{lang.redis.menu.about.about}</T> },
		],
	},
];

export const Redis = () => {
	const [userState, setUserState] = useState<"loggedIn" | "loggedOut">("loggedOut");
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [selectedMenuItem, setSelectedMenutItem] = useState<MenuItemId>("dataCenter");
	const storeUser = StoreUser();

	useEffect(() => {
		if (storeUser.token) {
			setUserState("loggedIn");
			setIsMenuVisible(false);
		}
	}, [storeUser.token]);

	const handleOnClickLogout = () => {
		setUserState("loggedOut");
		setIsMenuVisible(false);
		storeUser.setToken("");
	};

	const handleOnClickMenu = () => {
		setIsMenuVisible(!isMenuVisible);
	};

	const handleOnClickMenuBackground = () => {
		setIsMenuVisible(false);
	};

	const handleOnClickMenuItem = (id: MenuItemId) => {
		setIsMenuVisible(!isMenuVisible);
		setSelectedMenutItem(id);
	};

	return (
		<S.Redis>
			<S.Bar>
				{userState === "loggedIn" && <S.IconMenu iconName="iconMenu" onClick={handleOnClickMenu} />}
				{userState === "loggedIn" && <S.IconLogout iconName="iconLogOut" onClick={handleOnClickLogout} />}
			</S.Bar>

			<S.Container>
				<S.Transition visible={userState === "loggedOut"}>
					<User />
				</S.Transition>

				<S.Transition visible={userState === "loggedIn"}>
					<Menu visible={isMenuVisible} menuGroups={menuGroups} onClickBackground={handleOnClickMenuBackground} onClickItem={handleOnClickMenuItem}>
						<S.Transition visible={selectedMenuItem === "dataCenter"}>
							<Navigator>
								<Navigator.Page id="app" title={<T>{lang.redis.menu.data.dataCenter}</T>}>
									<Datacenter />
								</Navigator.Page>
							</Navigator>
						</S.Transition>

						<S.Transition visible={selectedMenuItem === "dataAccess"}>
							<Navigator>
								<Navigator.Page id="app" title={<T>{lang.redis.menu.data.dataAccess}</T>}>
									<Home />
								</Navigator.Page>
							</Navigator>
						</S.Transition>
					</Menu>
				</S.Transition>
			</S.Container>
		</S.Redis>
	);
};
