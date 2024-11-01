import { mutateCreateBdb } from "./bdb/mutateCreateBdb";
import { mutateDeleteBdb } from "./bdb/mutateDeleteBdb";
import { quryBdbs } from "./bdb/queryBdbs";
import { quryCrdbs } from "./crdb/quryCrdbs";
import { quryCsrf } from "./csrf/quryCsrf";
import { mutateLogin } from "./login/mutateLogin";
import { quryMe } from "./me/quryMe";
import { quryPlans } from "./plan/quryPlans";
import { quryRegions } from "./region/quryRegions";
import { qurySubscriptions } from "./subscription/qurySubscriptions";

export const Api = {
	login: {
		mutateLogin,
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
