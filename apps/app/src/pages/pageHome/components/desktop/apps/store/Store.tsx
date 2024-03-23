import { Modal } from "@src/components/modal/Modal";
import { StoreApps } from "../../stores/StoreApps";
import * as S from "./Store.styles";
import { useState } from "react";
import { lang } from "@src/locales/i18n";
import { T } from "@src/locales/T";

type IStore = {
	name: string;
	apps: IApp[];
};

type IApp = {
	name: string;
	url: string;
	icon: string;
};

const store: IStore[] = [
	{
		name: "Apps",
		apps: [
			{
				name: "Excalidraw",
				url: "https://excalidraw.com/",
				icon: "https://styles.redditmedia.com/t5_6f8nh5/styles/communityIcon_8l0jfnqfbrnb1.png",
			},
		],
	},
	{
		name: "News",
		apps: [
			{
				name: "THE Sun",
				url: "https://www.thesun.co.uk/",
				icon: "https://www.thesun.co.uk/wp-content/themes/thesun/images/sunmasthead.svg",
			},
			{
				name: "The New York Times",
				url: "https://www.nytimes.com/",
				icon: "https://assets.website-files.com/5ee732bebd9839b494ff27cd/5ef0851a79b5307a5f3dc780_the-new-york-times-logo.jpg",
			},
		],
	},
];

export const Store = () => {
	const storeApps = StoreApps();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedApp, setSelectedApp] = useState<IApp | null>(null);

	const handleOnClickAppIcon = (app: IApp) => {
		setIsModalVisible(true);
		setSelectedApp(app);
	};

	const handleSaveNo = () => {
		setIsModalVisible(false);
		setSelectedApp(null);
	};

	const handleSaveYes = () => {
		if (selectedApp) {
			storeApps.setData([...storeApps.apps, selectedApp]);
		}

		setIsModalVisible(false);
		setSelectedApp(null);
	};

	return (
		<>
			<S.Store>
				{store.map((group) => (
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
				isVisible={isModalVisible}
				iconName="question"
				text={<T>{lang.misc.areYouSure}</T>}
				onClickBackground={handleSaveNo}
				buttonContentA={<T>{lang.misc.yes}</T>}
				buttonCallbackA={handleSaveYes}
				buttonContentB={<T>{lang.misc.no}</T>}
				buttonCallbackB={handleSaveNo}
			/>
			|
		</>
	);
};
