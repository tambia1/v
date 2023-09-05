import { Pages } from "@pages/Pages.types";
import { Button } from "@src/components/button/Button";
import { MenuBar } from "@src/components/menuBar/MenuBar";
import { MenuBarItem } from "@src/components/menuBarItem/MenuBarItem";
import { Modal } from "@src/components/modal/Modal";
import { content } from "@src/locale/en";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./PageMenu.styles";

export type ItemType = "dataCenter" | "themes" | "about" | "logout";

interface Props {
	selectedItem: ItemType;
}

export const PageMenu = ({ selectedItem }: Props) => {
	const navigate = useNavigate();
	const [isAlertVisible, setIsAlertVisible] = useState(false);

	const handleOnClickDataCenter = () => {
		navigate(Pages.home.dataCenter);
	};

	const handleOnClickThemes = () => {
		navigate(Pages.home.themes);
	};

	const handleOnClickAbout = () => {
		navigate(Pages.home.about);
	};

	const handleOnClickLogout = () => {
		setIsAlertVisible(true);
	};

	const handleOnClickAlertYes = () => {
		setIsAlertVisible(false);
		navigate(Pages.login);
	};

	const handleOnClickAlertNo = () => {
		setIsAlertVisible(false);
	};

	return (
		<>
			<MenuBar>
				<MenuBarItem isSelected={selectedItem === "dataCenter"} onClick={handleOnClickDataCenter}>
					<S.ImageServer />
					<S.Text>{content.screenDataCenter.title}</S.Text>
				</MenuBarItem>
				<MenuBarItem isSelected={selectedItem === "themes"} onClick={handleOnClickThemes}>
					<S.ImageTheme />
					<S.Text>{content.screenThemes.title}</S.Text>
				</MenuBarItem>
				<MenuBarItem isSelected={selectedItem === "about"} onClick={handleOnClickAbout}>
					<S.ImageAbout />
					<S.Text>{content.screenAbout.title}</S.Text>
				</MenuBarItem>
				<MenuBarItem isSelected={selectedItem === "logout"} onClick={handleOnClickLogout}>
					<S.ImageLogout />
					<S.Text>{content.screenLogout.title}</S.Text>
				</MenuBarItem>
			</MenuBar>

			<Modal isVisible={isAlertVisible} onClickBackground={handleOnClickAlertNo}>
				<Modal.Box>
					<Modal.Box.Content>
						<Modal.Box.Content.Icon iconName="help" />
						<Modal.Box.Content.Text>{content.pageMenu.logout.alertText}</Modal.Box.Content.Text>
					</Modal.Box.Content>
					<Modal.Buttons>
						<Button onClick={handleOnClickAlertNo}>{content.pageMenu.logout.alertButtonNo}</Button>
						<Button onClick={handleOnClickAlertYes}>{content.pageMenu.logout.alertButtonYes}</Button>
					</Modal.Buttons>
				</Modal.Box>
			</Modal>
		</>
	);
};
