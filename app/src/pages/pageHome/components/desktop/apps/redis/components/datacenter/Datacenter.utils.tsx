import { Subscription, SubscriptionType } from "./Datacenter.types";

export const getSubscriptionType = (subscription: Subscription): SubscriptionType => {
	if (subscription.aa_rcp) {
		return "active-active";
	}

	if (subscription.rcp) {
		return "pro";
	}

	return "fixed";
};

export const convertBytes = (bytes: number, unit: "bytes" | "mb" | "gb") => {
	const conversionFactors = {
		bytes: 1,
		mb: 1024 * 1024,
		gb: 1024 * 1024 * 1024,
	};

	const convertedValue = bytes / conversionFactors[unit];
	return `${convertedValue.toFixed(2)}`;
};
