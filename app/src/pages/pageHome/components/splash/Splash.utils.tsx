import { Icons } from "@src/icons/Icon.types";
import { backgroundImages } from "./../desktop/apps/settings/components/page/components/theme/Theme.styles";
import userLoggedIn from "@apps/user/assets/userLoggedIn.png";
import userLoggedOut from "@apps/user/assets/userLoggedOut.png";
import { appIcons as DesktopButtonsIcons } from "../desktop/components/appButton/AppButton.styles";
import storeBg from "@apps/store/assets/bg.jpg";
import modalIconsCheck from "@components/modal/components/box/components/content/components/icon/assets/Check.png";
import modalIconsClose from "@components/modal/components/box/components/content/components/icon/assets/Close.png";
import modalIconsError from "@components/modal/components/box/components/content/components/icon/assets/Error.png";
import modalIconsInfo from "@components/modal/components/box/components/content/components/icon/assets/Info.png";
import modalIconsQuestion from "@components/modal/components/box/components/content/components/icon/assets/Question.png";
import slotMachine from "@apps/spin/pages/components/slotMachine/assets/slotMachine.png";
import ninjaGrass from "@apps/ninja/pages/game/images/grass.png";
import ninjaBoard from "@apps/ninja/pages/game/images/board.jpg";

export const getImagesToCache = () => {
	return [
		Object.values(Icons),
		backgroundImages.map((item) => item.light),
		backgroundImages.map((item) => item.dark),
		[userLoggedIn, userLoggedOut],
		Object.values(DesktopButtonsIcons),
		[modalIconsCheck, modalIconsClose, modalIconsError, modalIconsInfo, modalIconsQuestion],
		storeBg,
		slotMachine,
		[ninjaBoard, ninjaGrass],
	];
};
