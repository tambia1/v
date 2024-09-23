import { Subscription, SubscriptionType } from "./Page.types";

export const getSubscriptionType = (subscription: Subscription): SubscriptionType => {
	if (subscription.aa_rcp) {
		return "active-active";
	}

	if (subscription.rcp) {
		return "pro";
	}

	return "fixed";
};
