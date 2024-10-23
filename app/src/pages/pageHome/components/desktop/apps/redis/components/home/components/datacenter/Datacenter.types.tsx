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
		memorySize: number;
		dbSize: number;
		usage: number;
		highAvailability: boolean;
		dataPersistence: string;
	}[];
};
