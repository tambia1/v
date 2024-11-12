import type { PlanCloud, PlanType } from "../../../../api/Api.types";

export type DataCenterType = {
	collapsed: boolean;
	id: number;
	name: string;
	type: PlanType;
	cloud: PlanCloud;
	redisOnFlash: boolean;
	multiAvailabilityZone: boolean;
	regions: {
		id: number;
		name: string;
		city: string;
		flag: string;
		longitude: number;
		latitude: number;
	}[];
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
