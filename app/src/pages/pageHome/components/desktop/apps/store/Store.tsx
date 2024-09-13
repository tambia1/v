import { Modal } from "@src/components/modal/Modal";
import { StoreApps } from "../../stores/StoreApps";
import * as S from "./Store.styles";
import { useState } from "react";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { IApp } from "./Store.types";
import { stores } from "./Stores.data";

export const Store = () => {
	const storeApps = StoreApps();
	const [isModalSaveVisible, setIsModalSaveVisible] = useState(false);
	const [isModalExistVisible, setIsModalExistVisible] = useState(false);
	const [selectedApp, setSelectedApp] = useState<IApp | null>(null);

	const handleOnClickAppIcon = (app: IApp) => {
		if (storeApps.apps.find((item) => item.name === app.name)) {
			setIsModalExistVisible(true);
		} else {
			setIsModalSaveVisible(true);
			setSelectedApp(app);
		}
	};

	const handleSaveNo = () => {
		setIsModalSaveVisible(false);
		setSelectedApp(null);
	};

	const handleSaveYes = () => {
		if (selectedApp) {
			storeApps.setData([...storeApps.apps, selectedApp]);
		}

		setIsModalSaveVisible(false);
		setSelectedApp(null);
	};

	const handleExistOk = () => {
		setIsModalExistVisible(false);
		setSelectedApp(null);
	};

	return (
		<>
			<S.Store>
				{stores.map((group) => (
					<S.Group key={group.name}>
						<S.Title>{group.name}</S.Title>

						{group.apps.map((app) => (
							<S.App key={app.name}>
								<S.AppIcon url={app.icon} onClick={() => handleOnClickAppIcon(app)}></S.AppIcon>
								<S.AppName>{app.name}</S.AppName>
							</S.App>
						))}
					</S.Group>
				))}
			</S.Store>

			<Modal
				isVisible={isModalSaveVisible}
				iconName="question"
				text={<T>{lang.store.saveApp}</T>}
				onClickBackground={handleSaveNo}
				buttons={[
					{
						content: <T>{lang.misc.yes}</T>,
						onClick: handleSaveYes,
					},
					{
						content: <T>{lang.misc.no}</T>,
						onClick: handleSaveNo,
					},
				]}
			/>

			<Modal
				isVisible={isModalExistVisible}
				iconName="info"
				text={<T>{lang.store.alreadySaved}</T>}
				onClickBackground={handleSaveNo}
				buttons={[
					{
						content: <T>{lang.misc.ok}</T>,
						onClick: handleExistOk,
					},
				]}
			/>
		</>
	);
};
