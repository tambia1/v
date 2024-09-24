import { ReactNode } from "react";
import { plans } from "../../data/plans";
import { subs } from "../../data/subs";
import { bdbs } from "../../data/bdbs";

export type Sub = {
	name: ReactNode;
	id: number;
	type: SubscriptionType;
	cloud: CloudType;
	dbs: {
		name: string;
		id: number;
		usage: number;
	}[];
};

export type Subscription = (typeof subs)[number];
export type SubscriptionType = "fixed" | "pro" | "active-active";
export type CloudType = (typeof plans)[number]["cloud"];

export type Bdb = (typeof bdbs)[0];

export type Plan = (typeof plans)[0];
