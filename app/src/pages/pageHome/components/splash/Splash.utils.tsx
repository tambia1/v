import ninjaBoard from "@apps/ninja/pages/game/images/board.jpg";
import ninjaGrass from "@apps/ninja/pages/game/images/grass.png";
import speddCaliper from "@apps/speed/images/caliper.png";
import speedCompass from "@apps/speed/images/compass.png";
import speedometer from "@apps/speed/images/speedometer.png";
import slotMachine from "@apps/spin/pages/components/slotMachine/assets/slotMachine.png";
import storeBg from "@apps/store/assets/bg.jpg";
import userLoggedIn from "@apps/user/assets/userLoggedIn.png";
import userLoggedOut from "@apps/user/assets/userLoggedOut.png";
import modalIconsCheck from "@components/modal/components/box/components/content/components/icon/assets/Check.png";
import modalIconsClose from "@components/modal/components/box/components/content/components/icon/assets/Close.png";
import modalIconsError from "@components/modal/components/box/components/content/components/icon/assets/Error.png";
import modalIconsInfo from "@components/modal/components/box/components/content/components/icon/assets/Info.png";
import modalIconsQuestion from "@components/modal/components/box/components/content/components/icon/assets/Question.png";
import worldMapDark from "@components/worldMap/assets/world-map-dark.png";
import worldMapLight from "@components/worldMap/assets/world-map-light.png";
import { Icons } from "@src/components/icon/Icon.types";
import { appIcons as DesktopButtonsIcons } from "../desktop/components/appButton/AppButton.styles";
import { backgroundImages } from "./../desktop/apps/settings/components/page/components/theme/Theme.styles";

const chunkArray = (arr: string[], chunkSize: number): string[][] => {
	const chunks: string[][] = [];

	for (let i = 0; i < arr.length; i += chunkSize) {
		chunks.push(arr.slice(i, i + chunkSize));
	}

	return chunks;
};

export const getImagesToCache = (): string[][] => {
	const imagesGroups = [
		[userLoggedIn, userLoggedOut],
		Object.values(DesktopButtonsIcons),
		Object.values(Icons),
		backgroundImages.map((item) => item.light),
		backgroundImages.map((item) => item.dark),
		[modalIconsCheck, modalIconsClose, modalIconsError, modalIconsInfo, modalIconsQuestion],
		[storeBg],
		[slotMachine],
		[ninjaBoard, ninjaGrass],
		[speedometer, speddCaliper, speedCompass],
		[worldMapLight, worldMapDark],
	];

	const CHUNK_SIZE = 50;
	const result: string[][] = [];

	imagesGroups.forEach((imageGroup) => {
		if (imageGroup.length >= CHUNK_SIZE) {
			result.push(...chunkArray(imageGroup, CHUNK_SIZE));
		} else {
			result.push(imageGroup);
		}
	});

	return result;
};
