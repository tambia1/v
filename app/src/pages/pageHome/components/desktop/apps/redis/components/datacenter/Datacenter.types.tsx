import { ReactNode } from "react";
import { plans } from "../../data/plans";
import { subs } from "../../data/subs";
import { bdbs } from "../../data/bdbs";

export type Sub = {
	name: ReactNode;
	id: number;
	type: PlanType;
	cloud: CloudType;
	size: number;
	dbs: {
		name: string;
		id: number;
		usage: number;
		size: number;
	}[];
};

export type Subscription = (typeof subs)[number];
export type CloudType = (typeof plans)[number]["cloud"];

export type Bdb = (typeof bdbs)[number];

export type Plan = (typeof plans)[number];
export type PlanType = (typeof plans)[number]["plan_type"];
