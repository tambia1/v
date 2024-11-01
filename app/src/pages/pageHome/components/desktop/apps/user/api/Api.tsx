import { mutateLogin } from "./login/MutateLogin";
import { mutateLogout } from "./login/MutateLogout";
import { mutateToken } from "./login/MutateToken";
import { queryUser } from "./user/QueryUser,";

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
