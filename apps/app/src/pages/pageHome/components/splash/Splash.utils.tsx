import { Icons } from "@src/icons/Icon.types";
import { backgroundImages } from "./../desktop/apps/settings/pages/components/theme/Theme.styles";
import userLoggedIn from "@apps/user/assets/userLoggedIn.png";
import userLoggedOut from "@apps/user/assets/userLoggedOut.png";
import { appIcons as DesktopButtonsIcons } from "../desktop/components/appButton/AppButton.styles";
import storeBg from "@apps/store/assets/bg.jpg";
import ModalIconsCheck from "@components/modal/components/box/components/content/components/icon/assets/Check.png";
import ModalIconsClose from "@components/modal/components/box/components/content/components/icon/assets/Close.png";
import ModalIconsError from "@components/modal/components/box/components/content/components/icon/assets/Error.png";
import ModalIconsInfo from "@components/modal/components/box/components/content/components/icon/assets/Info.png";
import ModalIconsQuestion from "@components/modal/components/box/components/content/components/icon/assets/Question.png";

export const getImagesToCache = () => {
	return [
		Object.values(Icons),
		backgroundImages.map((item) => item.light),
		backgroundImages.map((item) => item.dark),
		[userLoggedIn, userLoggedOut],
		Object.values(DesktopButtonsIcons),
		storeBg,
		[ModalIconsCheck, ModalIconsClose, ModalIconsError, ModalIconsInfo, ModalIconsQuestion],
	];
};
