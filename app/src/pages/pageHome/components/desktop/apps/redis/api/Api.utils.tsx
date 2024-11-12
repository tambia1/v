import { regions } from "../data/regions";
import { regionsLocations } from "../data/regionsLocations";
import type { Bdb, Crdb, Plan } from "./Api.types";

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
	return plan?.size || bdb?.size || (crdb?.memory_size_in_mb || 0) * 1024 * 1024;
};

export const getRegionInfo = (regionName: string) => {
	const region = regions.find((region) => region.name === regionName);

	return {
		id: region?.region_id || 0,
		name: region?.name || "",
		city: region?.city_name || "",
		flag: region?.flag || "",
		longitude: regionsLocations[region?.id as keyof typeof regionsLocations]?.longitude || 0,
		latitude: regionsLocations[region?.id as keyof typeof regionsLocations]?.latitude || 0,
	};
};
