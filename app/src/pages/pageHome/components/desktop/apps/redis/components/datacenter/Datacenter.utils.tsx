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

export const convertBytes = (bytes: number, unit: "bytes" | "mb" | "gb" | "tb" | "biggest") => {
	const factor = {
		bytes: 1,
		mb: 1024 * 1024,
		gb: 1024 * 1024 * 1024,
		tb: 1024 * 1024 * 1024 * 1024,
		biggest: 1,
	};

	let finalUnit = unit;

	if (unit === "biggest") {
		if (bytes >= factor.tb) {
			finalUnit = "tb";
		} else if (bytes >= factor.gb) {
			finalUnit = "gb";
		} else if (bytes >= factor.mb) {
			finalUnit = "mb";
		} else {
			finalUnit = "bytes";
		}
	}

	const convertedValue = bytes / factor[finalUnit];
	return `${convertedValue.toFixed(2)} ${finalUnit.toUpperCase()}`;
};
