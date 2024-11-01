import { mutateLogin } from "./login/MmutateLogin";
import { mutateLogout } from "./login/MmutateLogout";
import { mutateToken } from "./login/MmutateToken";
import { queryUser } from "./user/QqueryUser,";

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
