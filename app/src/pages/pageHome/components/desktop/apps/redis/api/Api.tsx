import { mutateCreateBdb } from "./bdb/MmutateCreateBdb";
import { mutateDeleteBdb } from "./bdb/MmutateDeleteBdb";
import { quryBdbs } from "./bdb/QqueryBdbs";
import { quryCrdbs } from "./crdb/QquryCrdbs";
import { quryCsrf } from "./csrf/QquryCsrf";
import { mutateLogin } from "./login/MmutateLogin";
import { mutateLogout } from "./login/MmutateLogout";
import { quryMe } from "./me/QquryMe";
import { quryPlans } from "./plan/QquryPlans";
import { quryRegions } from "./region/QquryRegions";
import { qurySubscriptions } from "./subscription/QqurySubscriptions";

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
