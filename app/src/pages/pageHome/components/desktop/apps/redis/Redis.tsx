import * as S from "./Redis.styles";
import { Menu } from "@src/components/menu/Menu";
import { Navigator } from "@src/components/navigator/Navigator";
import { useState } from "react";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { Home } from "./components/home/Home";
import { Datacenter } from "./components/datacenter/Datacenter";
import { StoreUser } from "./components/user/stores/StoreUser";
import { User } from "./components/user/User";
import { menuGroups, MenuItemId } from "./Redis.types";

/*
	make sure you have:
	/etc/hosts
	127.0.0.1 test.redislabs.com

	browser:
	https://test.redislabs.com:5000/v

	use direct login

	on fetch data error it will use fake data

*/

export const Redis = () => {
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [selectedMenuId, setSelectedMenutId] = useState<MenuItemId>("dataCenter");
	const storeUser = StoreUser();
	const isLoggedin = Boolean(storeUser.csrf);

	const handleOnClickLogout = () => {
		storeUser.setCsrf("");
		setIsMenuVisible(false);
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
				{isLoggedin && <S.IconMenu iconName="iconMenu" onClick={handleOnClickMenu} />}
				{isLoggedin && <S.IconLogout iconName="iconLogOut" onClick={handleOnClickLogout} />}
			</S.Bar>

			<S.Container>
				<S.Transition $visible={!isLoggedin}>
					<User />
				</S.Transition>

				<S.Transition $visible={isLoggedin}>
					{isLoggedin && (
						<Menu $visible={isMenuVisible} menuGroups={menuGroups} selectedMenuId={selectedMenuId} onClickBackground={handleOnClickMenuBackground} onClickItem={handleOnClickMenuItem}>
							<S.Transition $visible={selectedMenuId === "dataCenter"}>
								<Navigator>
									<Navigator.Page id="app" title={<T>{lang.redis.menu.data.dataCenter}</T>}>
										<Datacenter />
									</Navigator.Page>
								</Navigator>
							</S.Transition>

							<S.Transition $visible={selectedMenuId === "dataAccess"}>
								<Navigator>
									<Navigator.Page id="app" title={<T>{lang.redis.menu.data.dataAccess}</T>}>
										<Home />
									</Navigator.Page>
								</Navigator>
							</S.Transition>
						</Menu>
					)}
				</S.Transition>
			</S.Container>
		</S.Redis>
	);
};
