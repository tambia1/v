import type { ReactNode } from "react";
import type { PlanCloud, PlanType, Region } from "../../../../queries/Query.types";

export type DataCenterType = {
	collapsed: boolean;
	id: number;
	name: ReactNode;
	type: PlanType;
	cloud: PlanCloud;
	redisOnFlash: boolean;
	multiAvailabilityZone: boolean;
	regions: Region[];
	dbs: {
		collapsed: boolean;
		id: number;
		name: string;
		usage: number;
		size: number;
		highAvailability: boolean;
		dataPersistence: string;
	}[];
};
