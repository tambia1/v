import type { ReactNode } from "react";
import type { HighAvailability, PlanCloud, PlanType, Region } from "../../../user/queries/Query.types";

export type DataCenterType = {
	name: ReactNode;
	id: number;
	type: PlanType;
	cloud: PlanCloud;
	regions: Region[];
	rof: boolean;
	dbs: {
		name: string;
		id: number;
		usage: number;
		size: number;
		highAvailability: HighAvailability;
		dataPersistence: string;
	}[];
};
