import type { ReactNode } from "react";
import type { PlanCloud, PlanType, Region } from "../../../user/queries/Query.types";

export type Sub = {
	name: ReactNode;
	id: number;
	type: PlanType;
	cloud: PlanCloud;
	regions: Region[];
	dbs: {
		name: string;
		id: number;
		usage: number;
		size: number;
	}[];
};
