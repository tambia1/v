import { Navigator } from "@src/components/navigator/Navigator";
import { SideMenu } from "@src/components/sideMenu/SideMenu";
import { T } from "@src/locales/T";
import { lang } from "@src/locales/i18n";
import { useState } from "react";
import { Api } from "../../api/Api";
import { StoreUser } from "../user/stores/StoreUser";
import * as S from "./Home.styles";
import { type MenuItemId, menuGroups } from "./Home.types";
import { About } from "./components/about/About";
import { Datacenter } from "./components/datacenter/Datacenter";
import { Test } from "./components/test/Test";

export const Home = () => {
	const storeUser = StoreUser();
	const mutateLogout = Api.login.mutateLogout();
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [selectedMenuId, setSelectedMenutId] = useState<MenuItemId>("dataCenter");

	const handleOnClickLogout = async () => {
		await mutateLogout();
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
		<S.Home>
			<S.Bar>
				<S.IconMenu iconName="iconMenu" onClick={handleOnClickMenu} />
				<S.IconLogout iconName="iconLogOut" onClick={handleOnClickLogout} />
			</S.Bar>

			<S.Container>
				<SideMenu
					$visible={isMenuVisible}
					menuGroups={menuGroups}
					selectedMenuId={selectedMenuId}
					onClickBackground={handleOnClickMenuBackground}
					onClickItem={handleOnClickMenuItem}
				>
					<S.Transition $visible={selectedMenuId === "dataCenter"}>
						<Navigator>
							<Navigator.Page id={selectedMenuId} title={<T>{lang.redis.menu.data.dataCenter}</T>}>
								<Datacenter />
							</Navigator.Page>
						</Navigator>
					</S.Transition>

					<S.Transition $visible={selectedMenuId === "dataAccess"}>
						<Navigator>
							<Navigator.Page id={selectedMenuId} title={<T>{lang.redis.menu.data.dataAccess}</T>}>
								<Test />
							</Navigator.Page>
						</Navigator>
					</S.Transition>

					<S.Transition $visible={selectedMenuId === "about"}>
						<About />
					</S.Transition>
				</SideMenu>
			</S.Container>
		</S.Home>
	);
};
