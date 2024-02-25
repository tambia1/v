import { Icons } from "@src/icons/Icon.types";
import { backgroundImages } from "../../apps/settings/page/components/theme/Theme.styles";
import userLoggedIn from "@pages/pageHome/apps/user/assets/userLoggedIn.png";
import userLoggedOut from "@pages/pageHome/apps/user/assets/userLoggedOut.png";

export const getImagesToCache = () => {
	return [Object.values(Icons), ...backgroundImages.map((item) => item.light), ...backgroundImages.map((item) => item.dark), [userLoggedIn, userLoggedOut]];
};
