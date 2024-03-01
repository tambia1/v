import { Icons } from "@src/icons/Icon.types";
import { backgroundImages } from "./../desktop/apps/settings/page/components/theme/Theme.styles";
import userLoggedIn from "@apps/user/assets/userLoggedIn.png";
import userLoggedOut from "@apps/user/assets/userLoggedOut.png";
import { appIcons } from "../desktop/components/appButton/AppButton.styles";

export const getImagesToCache = () => {
	return [Object.values(Icons), backgroundImages.map((item) => item.light), backgroundImages.map((item) => item.dark), [userLoggedIn, userLoggedOut], Object.values(appIcons)];
};
