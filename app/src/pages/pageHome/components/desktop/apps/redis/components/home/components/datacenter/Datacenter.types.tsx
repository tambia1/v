import type { PlanCloud, PlanType, Region } from "../../../../api/Api.types";

export type DataCenterType = {
	collapsed: boolean;
	id: number;
	name: string;
	type: PlanType;
	cloud: PlanCloud;
	redisOnFlash: boolean;
	multiAvailabilityZone: boolean;
	regions: Region[];
	subPrice: number;
	dbs: {
		collapsed: boolean;
		id: number;
		name: string;
		memorySize: number;
		dbSize: number;
		usage: number;
		highAvailability: boolean;
		dataPersistence: string;
		shardCount: number;
		modules: string[];
		dbPrice: number;
	}[];
};

export type Filter = "subs" | "dbs";
