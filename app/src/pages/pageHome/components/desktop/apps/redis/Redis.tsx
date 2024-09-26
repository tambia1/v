import * as S from "./Redis.styles";
import { Menu } from "@src/components/menu/Menu";
import { Navigator } from "@src/components/navigator/Navigator";
import { useEffect, useState } from "react";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Home } from "./components/home/Home";
import { Datacenter } from "./components/datacenter/Datacenter";
import { StoreUser } from "./components/user/stores/StoreUser";
import { User } from "./components/user/User";
import { menuGroups, MenuItemId } from "./Redis.types";

export const Redis = () => {
	const [userState, setUserState] = useState<"loggedIn" | "loggedOut">("loggedOut");
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [selectedMenuId, setSelectedMenutId] = useState<MenuItemId>("dataCenter");
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
		setSelectedMenutId(id);
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
					<Menu visible={isMenuVisible} menuGroups={menuGroups} selectedMenuId={selectedMenuId} onClickBackground={handleOnClickMenuBackground} onClickItem={handleOnClickMenuItem}>
						<S.Transition visible={selectedMenuId === "dataCenter"}>
							<Navigator>
								<Navigator.Page id="app" title={<T>{lang.redis.menu.data.dataCenter}</T>}>
									<Datacenter />
								</Navigator.Page>
							</Navigator>
						</S.Transition>

						<S.Transition visible={selectedMenuId === "dataAccess"}>
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
