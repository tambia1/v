import { mutateCreateBdb } from "./bdb/MutateCreateBdb";
import { mutateDeleteBdb } from "./bdb/MutateDeleteBdb";
import { quryBdbs } from "./bdb/QueryBdbs";
import { quryCrdbs } from "./crdb/QuryCrdbs";
import { quryCsrf } from "./csrf/QuryCsrf";
import { mutateLogin } from "./login/MutateLogin";
import { mutateLogout } from "./login/MutateLogout";
import { quryMe } from "./me/QuryMe";
import { quryPlans } from "./plan/QuryPlans";
import { quryRegions } from "./region/QuryRegions";
import { qurySubscriptions } from "./subscription/QurySubscriptions";

export const Api = {
	login: {
		mutateLogin,
		mutateLogout,
	},
	csrf: {
		quryCsrf,
	},
	me: {
		quryMe,
	},
	region: {
		quryRegions,
	},
	plan: {
		quryPlans,
	},
	subscription: {
		qurySubscriptions,
	},
	bdb: {
		quryBdbs,
		mutateCreateBdb,
		mutateDeleteBdb,
	},
	crdb: {
		quryCrdbs,
	},
};
