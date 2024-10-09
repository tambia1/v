import type { Bdb, Crdb, Plan } from "./Query.types";

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

export const getDbSize = ({ bdb, crdb, plan }: { bdb?: Bdb; crdb?: Crdb; plan?: Plan }) => {
	return bdb?.size || plan?.size || (crdb?.memory_size_in_mb || 0) * 1024 * 1024;
};
