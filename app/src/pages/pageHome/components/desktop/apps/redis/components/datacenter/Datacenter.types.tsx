import { ReactNode } from "react";
import { PlanCloud, PlanType } from "../user/queries/Query.types";

export type Sub = {
	name: ReactNode;
	id: number;
	type: PlanType;
	cloud: PlanCloud;
	dbs: {
		name: string;
		id: number;
		usage: number;
		size: number;
	}[];
};
