import type { ReactNode } from "react";
import type { PlanCloud, PlanType, Region } from "../../../user/queries/Query.types";

export type DataCenterType = {
	id: number;
	name: ReactNode;
	type: PlanType;
	cloud: PlanCloud;
	redisOnFlash: boolean;
	multiAvailabilityZone: boolean;
	regions: Region[];
	dbs: {
		id: number;
		name: string;
		usage: number;
		size: number;
		highAvailability: boolean;
		dataPersistence: string;
	}[];
};
