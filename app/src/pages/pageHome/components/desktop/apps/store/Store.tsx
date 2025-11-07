import { Modal } from "@src/components/modal/Modal";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";
import { useState } from "react";
import { StoreApps } from "../../stores/StoreApps";
import * as S from "./Store.styles";
import type { App } from "./Store.types";
import { stores } from "./Stores.data";

export const Store = () => {
	const storeApps = StoreApps();
	const [isModalSaveVisible, setIsModalSaveVisible] = useState(false);
	const [isModalExistVisible, setIsModalExistVisible] = useState(false);
	const [selectedApp, setSelectedApp] = useState<App | null>(null);

	const handleOnClickAppIcon = (app: App) => {
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
								<S.AppExistIcon iconName="iconCheckCircle" $isVisible={!!storeApps.apps.find((item) => item.name === app.name)} />
								<S.AppIcon url={app.icon} onClick={() => handleOnClickAppIcon(app)} />
								<S.AppName>{app.name}</S.AppName>
							</S.App>
						))}
					</S.Group>
				))}
			</S.Store>

			<Modal
				isVisible={isModalSaveVisible}
				iconName="question"
				description={<T>{lang.store.saveApp}</T>}
				onClickBackground={handleSaveNo}
				buttons={[
					{
						content: <T>{lang.all.yes}</T>,
						onClick: handleSaveYes,
					},
					{
						content: <T>{lang.all.no}</T>,
						onClick: handleSaveNo,
					},
				]}
			/>

			<Modal
				isVisible={isModalExistVisible}
				iconName="info"
				description={<T>{lang.store.alreadySaved}</T>}
				onClickBackground={handleSaveNo}
				buttons={[
					{
						content: <T>{lang.all.ok}</T>,
						onClick: handleExistOk,
					},
				]}
			/>
		</>
	);
};
