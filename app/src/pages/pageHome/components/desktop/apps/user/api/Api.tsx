import { mutateLogin } from "./login/mutateLogin";
import { mutateLogout } from "./login/mutateLogout";
import { mutateToken } from "./login/mutateToken";
import { queryUser } from "./user/queryUser,";

export const Api = {
	login: {
		mutateLogin,
		mutateLogout,
		mutateToken,
	},
	user: {
		queryUser,
	},
};
