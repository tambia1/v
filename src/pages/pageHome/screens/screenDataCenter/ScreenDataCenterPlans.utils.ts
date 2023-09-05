import { IServer } from "@src/data/data";
import { Plan, plans as availablePlans } from "@src/data/plans";

export const getPlans = (servers: IServer[]) => {
	const plans: (Plan & { isEnabled: boolean })[] = availablePlans.map((plan) => ({ ...plan, isEnabled: true }));

	let sizeCache = 0;
	let sizeFlash = 0;
	let sizeDisk = 0;

	servers.forEach((server) => {
		server.slots.primary.forEach((database) => {
			sizeCache += database.size;
		});

		server.slots.replica.forEach((database) => {
			sizeCache += database.size;
		});

		server.slots.flash.forEach((database) => {
			sizeCache += database.size;
		});

		server.slots.disk.forEach((database) => {
			sizeCache += database.size;
		});
	});

	plans.forEach((plan) => {
		if (plan.sizeCache < sizeCache || plan.sizeFlash < sizeFlash || plan.sizeDisk < sizeDisk) {
			plan.isEnabled = false;
		}
	});

	return plans;
};

export const getCost = (plans: (Plan & { isEnabled: boolean })[]) => {
	const min = plans.reduce((min, plan) => {
		return plan.isEnabled && plan.price < min ? plan.price : min;
	}, Infinity);

	return min;
};
